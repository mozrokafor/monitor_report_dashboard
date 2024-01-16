"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";
import { convertToSecs } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DurationBarGraphBrowsers = ({ chartData }: any) => {
  console.log({ chartData });
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monitor e2e fdsfAvg Execution Times - (Chromium - Firefox - Webkit)",
      },
      responsive: true,
      maintainAspectRaio: false,
    },
  };

  const chromeData = chartData.filter(
    (d: { browser: string }) => d.browser === "chrome"
  );
  const firefoxData = chartData.filter(
    (d: { browser: string }) => d.browser === "firefox"
  );
  const safariData = chartData.filter(
    (d: { browser: string }) => d.browser === "safari"
  );

  const labels = chromeData?.map((data: { timeStamp: any }) =>
    moment(data.timeStamp).format("lll")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Chrome",
        data: chromeData?.map((data: { duration: number }) =>
          convertToSecs(data.duration).toFixed(2)
        ),
        borderColor: "#17ca80",
        backgroundColor: "#17ca80",
      },
      {
        label: "Firefox",
        data: firefoxData?.map((data: { duration: number }) =>
          convertToSecs(data.duration).toFixed(2)
        ),
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Safari",
        data: safariData?.map((data: { duration: number }) =>
          convertToSecs(data.duration).toFixed(2)
        ),
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default DurationBarGraphBrowsers;
