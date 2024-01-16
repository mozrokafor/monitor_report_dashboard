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
        text: "Monitor e2e Avg Execution Times - (Chromium - Firefox - Webkit)",
      },
      responsive: true,
      maintainAspectRaio: false,
    },
  };

  const labels = chartData?.map((data: { endTime: any }) =>
    moment(data.endTime).format("lll")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Chrome",
        data: chartData?.map((data: { averageTestDuration: number }) =>
          convertToSecs(data.averageTestDuration).toFixed(2)
        ),
        borderColor: "#17ca80",
        backgroundColor: "#17ca80",
      },
      {
        label: "Firefox",
        data: chartData?.map((data: { averageTestDuration: number }) =>
          convertToSecs(data.averageTestDuration).toFixed(2)
        ),
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Safari",
        data: chartData?.map((data: { averageTestDuration: number }) =>
          convertToSecs(data.averageTestDuration).toFixed(2)
        ),
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default DurationBarGraphBrowsers;
