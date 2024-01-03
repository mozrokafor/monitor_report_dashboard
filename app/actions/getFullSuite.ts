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
  const healthPercentage = calculateHealthPercentage(latestData);
  const trend = getTrend(data);
  // const browsers = browserStats(data);

  // console.log({ browsers });

  return {
    data,
    isHealthy: latestData === 0 ? "Healthy" : "Not Healthy",
    latestData,
    testSuiteRuns,
    healthPercentage,
    trend,
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

  for (let i = 0; i < data.length; i++) {
    const suites = data[i].suites;
    let firefox = {
      timeStamp: suites.endTime,
      duration: 0,
    };
    let chromium = {
      timeStamp: suites.endTime,
      duration: 0,
    };
    let webkit = {
      timeStamp: suites.endTime,
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
