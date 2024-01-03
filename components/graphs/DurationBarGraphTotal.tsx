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

const DurationBarGraphTotal = ({ chartData }: any) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monitor e2e Total Execution Time Per Run - (Chromium - Firefox - Webkit)",
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
        label: "Total Suite Duration",
        data: chartData.map((data: { totalDuration: number }) =>
          convertToSecs(data.totalDuration).toFixed(2)
        ),
        borderColor: "#670067",
        backgroundColor: "#670067",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default DurationBarGraphTotal;
