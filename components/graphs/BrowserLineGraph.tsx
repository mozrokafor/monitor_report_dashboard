"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BrowserLineGraph = ({ chartData }: any) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // include a label for pass/fail on y-axis
          callback: function (value: any, index: any, values: any) {
            return value;
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Browser Statuses Per Test - (Chromium - Firefox - Webkit)",
      },
      responsive: true,
      maintainAspectRaio: false,
    },
  };

  const labels = chartData.map((data: { endTime: any }) =>
    moment(data.endTime).format("lll")
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Chromium",
        data: chartData.map((data: { browser: any }) => data.browser),
        borderColor: "#17ca80",
        backgroundColor: "#17ca80",
      },
      {
        label: "Firefox",
        data: chartData.map((data: { browser: any }) => data.browser),
        borderColor: "#f47169",
        backgroundColor: "#f47169",
      },
      {
        label: "Webkit",
        data: chartData.map((data: { browser: any }) => data.browser),
        borderColor: "#8d8d8d",
        backgroundColor: "#8d8d8d",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default BrowserLineGraph;
