// @ts-nocheck

interface ISuite {
  title: string;
  duration: number;
  tests: number;
  passed: true;
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
  console.log("data lengtrh", data.length);
  const latestData = data[data.length - 1];

  const testSuiteRuns = compileTests(latestData.suites);
  const healthPercentage = calculateHealthPercentage(latestData);
  const trend = getTrend(data);
  const suites = data.map((d) => d.suites);
  const testNumber = countTests(suites);
  const trimmedSuites = buildSuites(suites);

  // console.log("trimmedsuites: ", trimmedSuites);

  return {
    runs: data,
    isHealthy: latestData === 0 ? "Healthy" : "Not Healthy",
    latestData,
    testSuiteRuns,
    healthPercentage,
    trend,
    suites: trimmedSuites,
    testNumber,
    // browsers,
  };
}

const calculateHealthPercentage = (latestData: any) => {
  const total = latestData.totalTests - latestData.testsSkipped;
  const passed = latestData.testsPassed;

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
  console.log("line 35: ", flatMap.length);
  return flatMap;
};

const browserStats = (data: any) => {
  let ffArry = [];
  let chArry = [];
  let wbArry = [];

  console.log("line 104", data[0]);

  for (let i = 0; i < data.length; i++) {
    const suites = data[i].suites;
    let firefox = {
      timeStamp: data[i].endTime,
      duration: 0,
    };
    let chromium = {
      timeStamp: data[i].endTime,
      duration: 0,
    };
    let webkit = {
      timeStamp: data[i].endTime,
      duration: 0,
    };
    for (let j = 0; j < suites.length; j++) {
      const tests = suites[j].tests;
      for (let k = 0; k < tests.length; k++) {
        const test = tests[k];

        switch (test.browser) {
          case "chromium":
            chromium += test.duration;
            break;

          case "firefox":
            firefox += test.duration;
            break;

          case "webkit":
            webkit += test.duration;
            break;

          default:
            break;
        }
      }

      firefox.duration = Number((firefox.duration / tests.length).toFixed(2));
      webkit.duration = Number((webkit.duration / tests.length).toFixed(2));
      chromium.duration = Number((chromium.duration / tests.length).toFixed(2));
    }

    ffArry.push(firefox);
    wbArry.push(webkit);
    chArry.push(chromium);
  }

  return {
    chromium: chArry,
    firefox: ffArry,
    webkit: wbArry,
  };
};

const countTests = (data: any) => {
  let tCount = 0;
  for (let i = 0; i < data.length; i++) {
    let tempCount = 0;
    const runTests = data[i];

    for (let j = 0; j < runTests.length; j++) {
      tempCount += runTests[j].tests.length;
    }

    tCount += tempCount;
  }

  return tCount;
};

const buildSuites = (suites: ISuite[]) => {
  const fSuites: ISuite[] = suites.flat();
  let mainArr = [];
  const mainObj = {} as ISuite;

  for (let i = 0; i < fSuites.length; i++) {
    let passed = true;
    const title = fSuites[i].title;

    if (mainObj[title] === undefined) {
      fSuites[i].tests.forEach((el) => {
        if (el.status !== "passed") {
          passed = false;
        }
      }),
        // havent added yet
        (mainObj[title] = {
          title,
          duration: fSuites[i].duration,
          tests: fSuites[i].tests.length,
          passed: passed,
        });
      const temp = {
        title,
        duration: fSuites[i].duration,
        tests: fSuites[i].tests.length,
        passed: passed,
      };
      mainArr.push(temp);
    } else {
      // already added, update data
      mainObj[title] = {
        title: fSuites[i].title,
        duration: mainObj[title].duration + fSuites[i].duration,
        tests: mainObj[title].tests + fSuites[i].tests.length,
        passed: passed,
      };

      const temp = {
        title: fSuites[i].title,
        duration: mainObj[title].duration + fSuites[i].duration,
        tests: mainObj[title].tests + fSuites[i].tests.length,
        passed: passed,
      };

      const idx = mainArr.findIndex((ma) => ma.title === temp.title);

      if (idx !== -1) {
        mainArr[idx] = temp;
      }
    }
  }

  return mainArr;
};
