export default async function getFullSuiteHistory() {
  const urls = [
    "https://raw.githubusercontent.com/mozilla/blurts-server/e2e-report/failed_test_report.json",
    "https://raw.githubusercontent.com/mozilla/blurts-server/e2e-report/flake_test_report.json",
  ];

  try {
    const allRequests = urls.map((url) =>
      fetch(url).then((response) => response.json())
    );

    const [failures, flakes] = await Promise.all(allRequests);

    return {
      failures,
      flakes,
    };
  } catch (err) {
    console.log("Error Fetching Data: ", err);
  }
}
