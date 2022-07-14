import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
import { writeFileSync } from "fs";

const width = 800; //px
const height = 800; //px
const backgroundColour = "white";
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour,
});

export const exportarGrafico = async (fileName, axisX, axisY) => {
  const configuration = {
    type: "line",
    data: {
      labels: axisX.values,
      datasets: [
        {
          label: fileName,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: axisY.values,
        },
      ],
    },
    options: {
      scales: {
        xAxes: {
          title: {
            display: true,
            text: axisX.label,
            font: {
              size: 15,
            },
          },
        },
        yAxes: {
          title: {
            display: true,
            text: axisY.label,
            font: {
              size: 15,
            },
          },
          ticks: {
            precision: 0,
          },
        },
      },
    },
    plugins: [],
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  writeFileSync(`${fileName}.png`, image);
};
