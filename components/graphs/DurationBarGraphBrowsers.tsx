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
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monitor e2e Execution Times (in Seconds) - (Chromium - Firefox - Webkit)",
      },
      responsive: true,
      maintainAspectRaio: false,
    },
    scales: {
      x: {
        ticks: {
          stepSize: 2,
        },
      },
      y: {
        ticks: {
          callback: (value: any) => value + " seconds",
        },
      },
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
        borderColor: "#1aa260",
        backgroundColor: "#1aa260",
      },
      {
        label: "Firefox",
        data: firefoxData?.map((data: { duration: number }) =>
          convertToSecs(data.duration).toFixed(2)
        ),
        borderColor: "#E66000",
        backgroundColor: "#E66000",
      },
      {
        label: "Safari",
        data: safariData?.map((data: { duration: number }) =>
          convertToSecs(data.duration).toFixed(2)
        ),
        borderColor: "#0FB5EE",
        backgroundColor: "#0FB5EE",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default DurationBarGraphBrowsers;
