import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  scales,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  scales
);

const Graph: React.FC<{
  genres: { genre: string; percentage: number }[];
}> = ({ genres }) => {
  const genreLabels: string[] = genres.map((genre) => genre.genre);
  const percentages: number[] = genres.map((genre) => genre.percentage);
  const data = {
    labels: genreLabels,
    datasets: [
      {
        labels: genreLabels,
        data: percentages,
        backgroundColor: [
          "rgba(220, 38, 38, 0.9)",
          "rgba(37, 99, 235, 0.9)",
          "rgba(16, 185, 129, 0.9)",
          "rgba(217, 119, 6, 0.9)",
          "rgba(234, 88, 12, 0.9)",
          "rgba(107, 33, 168, 0.9)",
          "rgba(2, 132, 199, 0.9)",
          "rgba(22, 163, 74, 0.9)",
          "rgba(124, 45, 18, 0.9)",
          "rgba(44, 82, 130, 0.9)",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "x" as const,
    scales: {
      y: {
        ticks: {
          font: {
            weight: "bold" as const,
          },
        },
      },
      x: {
        ticks: {
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.x !== null) {
              label += context.parsed.y.toFixed(2) + " %";
            }
            return label;
          },
        },
      },
      title: {
        display: false,
        text: "Top Genres",
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default Graph;
