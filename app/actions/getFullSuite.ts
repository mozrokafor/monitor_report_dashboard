// @ts-nocheck

interface ISuite {
  title: string;
  duration: number;
  tests: number;
  passed: true;
  failedCount: number;
}

interface ISuites {
  suites: ISuite[];
}

export default async function getFullSuite() {
  const res = await fetch(
    "https://raw.githubusercontent.com/mozilla/blurts-server/e2e-report/full_test_report.json",
    {
      method: "GET",
      headers: { "content-type": "applications/json" },
    }
  );

  if (!res.ok) {
    console.log("err", res.statusText);
    return;
  }

  const data: any[] = await res.json();
  const latestData = data[data.length - 1];

  const testSuiteRuns = compileTests(latestData.suites);
  const suites = data.map((d) => d.suites);
  const testNumber = countTests(suites);
  const healthPercentage = calculateHealthPercentage(
    testNumber.fCount,
    testNumber.tCount
  );
  const trend = getTrend(data);
  const trimmedSuites = buildSuites(suites);
  const browsers = browserStats(data);

  return {
    runs: data,
    isHealthy: latestData === 0 ? "Healthy" : "Not Healthy",
    latestData,
    testSuiteRuns,
    healthPercentage,
    trend,
    suites: trimmedSuites,
    testNumber: testNumber.tCount,
    testNumberFailures: testNumber.fCount,
    testNumberFlakes: testNumber.flCount,
    browsers,
  };
}

const calculateHealthPercentage = (latestData: any, testNumber: number) => {
  const total = testNumber;
  const passed = testNumber - latestData;

  return (passed / total) * 100;
};

const getTrend = (data: any) => {
  const firstSet = data[data.length - 1];
  const secondSet = data[data.length - 2];
  const thirdSet = data[data.length - 3];

  if (
    firstSet.status === "passed" &&
    secondSet.status === "passed" &&
    thirdSet.status === "passed"
  ) {
    return "steady";
  } else if (
    firstSet.status === "passed" &&
    secondSet.status === "passed" &&
    thirdSet.status === "failed"
  ) {
    return "up";
  } else if (
    firstSet.status === "failed" &&
    secondSet.status === "failed" &&
    thirdSet.status === "passed"
  ) {
    return "down";
  } else if (
    firstSet.status === "failed" &&
    secondSet.status === "passed" &&
    thirdSet.status === "passed"
  ) {
    return "down";
  } else if (
    firstSet.status === "failed" &&
    secondSet.status === "failed" &&
    thirdSet.status === "failed"
  ) {
    return "down";
  } else if (
    firstSet.status === "passed" &&
    secondSet.status === "failed" &&
    thirdSet.status === "passed"
  ) {
    return "up";
  }
};

const compileTests = (suites: any[]) => {
  const allTests: any = [];
  for (let i = 0; i < suites.length; i++) {
    const suiteTest = suites[i].tests;
    allTests.push(suiteTest);
  }

  const flatMap = allTests.flat();
  return flatMap;
};

const browserStats = (data: any) => {
  let ffArry = [];
  let chArry = [];
  let wbArry = [];
  let mainBrowserArr = [];

  // loop through the main object, get durations reduced and number of tests added per browser
  for (let i = 0; i < data.length; i++) {
    const run = data[i];

    const chromeBrowserRunObject = {
      timeStamp: run.endTime,
      enviroment: run.environment,
      browser: "chrome",
      passed: true,
      duration: 0,
      tests: 0,
    };

    const firefoxBrowserRunObject = {
      timeStamp: run.endTime,
      enviroment: run.environment,
      browser: "firefox",
      passed: true,
      duration: 0,
      tests: 0,
    };

    const safariBrowserRunObject = {
      timeStamp: run.endTime,
      enviroment: run.environment,
      browser: "safari",
      passed: true,
      duration: 0,
      tests: 0,
    };

    for (let j = 0; j < run.suites.length; j++) {
      const suite = run.suites[j];

      // loop through tests
      for (let k = 0; k < suite.tests.length; k++) {
        const test = suite.tests[k];

        switch (test.browser) {
          case "chromium":
            chromeBrowserRunObject.duration =
              chromeBrowserRunObject.duration + test.duration;
            chromeBrowserRunObject.passed = test.status === "passed";
            chromeBrowserRunObject.tests++;
            break;
          case "firefox":
            firefoxBrowserRunObject.duration =
              firefoxBrowserRunObject.duration + test.duration;
            firefoxBrowserRunObject.passed = test.status === "passed";
            firefoxBrowserRunObject.tests++;
            break;
          case "webkit":
            safariBrowserRunObject.duration =
              safariBrowserRunObject.duration + test.duration;
            safariBrowserRunObject.passed = test.status === "passed";
            safariBrowserRunObject.tests++;
            break;

          default:
            break;
        }
      }
    }

    mainBrowserArr.push(
      chromeBrowserRunObject,
      firefoxBrowserRunObject,
      safariBrowserRunObject
    );
  }

  return mainBrowserArr;
};

const countTests = (data: any) => {
  let tCount = 0;
  let fCount = 0;
  let flCount = 0;
  for (let i = 0; i < data.length; i++) {
    let tempCount = 0;
    let tempFCount = 0;
    let tempFlakeCount = 0;
    const runTests = data[i];
    const tests = runTests[i].tests;

    for (let j = 0; j < runTests.length; j++) {
      tempCount += runTests[j].tests.length;

      // reduce would prob be more efficient here, however readibility is more important for this project in general
      tempFCount += tests.filter((t) => t.status === "failed").length;

      tempFlakeCount += tests.filter((t) => t.status === "flaky").length;
    }

    tCount += tempCount;
    fCount += tempFCount;
  }

  return { tCount, fCount, flCount };
};

const buildSuites = (suites: ISuite[]) => {
  const fSuites: ISuite[] = suites.flat();

  // array of components
  let mainArr = [];

  // loop throught flat tests array
  for (let i = 0; i < fSuites.length; i++) {
    const compObject = fSuites[i];

    // count failures
    const currentFailedCount = fSuites[i].tests.filter(
      (d) => d.status === "failed"
    ).length;

    // check if component object exists in mainarr
    const idx = _checkExists(mainArr, compObject);
    const temp = {
      title: fSuites[i].title,
      duration: fSuites[i].duration,
      tests: fSuites[i].tests.length,
      passed: currentFailedCount < 1,
      failedCount: currentFailedCount,
    };

    if (idx >= 0) {
      temp.duration = fSuites[i].duration + mainArr[idx].duration;
      temp.failedCount = currentFailedCount + mainArr[idx].failedCount;
      temp.tests = fSuites[i].tests.length + mainArr[idx].tests;

      mainArr[idx] = temp;
    } else {
      mainArr.push(temp);
    }
  }

  return mainArr;
};

const _checkExists = (oldArr: any[], searchObject: any) => {
  return oldArr.findIndex((old) => old.title === searchObject.title);
};
