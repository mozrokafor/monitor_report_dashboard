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

const StatusLineGraph = ({ chartData }: any) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monitor e2e Test Runs - (Chromium - Firefox - Webkit)",
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
          stepSize: 5,
          callback: (value: any) => value + " tests",
        },
      },
    },
  };

  const labels = chartData.map((data: { endTime: any }) =>
    moment(data.endTime).format("lll")
  );

  console.log({ labels });

  const data = {
    labels,
    datasets: [
      {
        label: "Passed",
        data: chartData.map((data: { testsPassed: any }) => data.testsPassed),
        borderColor: "#17ca80",
        backgroundColor: "#17ca80",
      },
      {
        label: "Flakes",
        data: chartData.map((data: { testsFlaky: any }) => data.testsFlaky),
        borderColor: "#ffbf00",
        backgroundColor: "#ffbf00",
      },
      {
        label: "Failures",
        data: chartData.map((data: { testsFailed: any }) => data.testsFailed),
        borderColor: "#f47169",
        backgroundColor: "#f47169",
      },
      {
        label: "TimeOuts",
        data: chartData.map(
          (data: { testsTimedout: any }) => data.testsTimedout
        ),
        borderColor: "#8d8d8d",
        backgroundColor: "#8d8d8d",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default StatusLineGraph;
