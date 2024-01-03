export default async function getSmokeSuite() {
  const res = await fetch(
    "https://raw.githubusercontent.com/mozrokafor/dashboard/main/data/workflowruns/functional-workflow-runs.json",
    {
      method: "GET",
      headers: { "content-type": "applications/json" },
    }
  );

  if (!res.ok) {
    console.log("err", res.statusText);
    return;
  }

  return res.json();
}
