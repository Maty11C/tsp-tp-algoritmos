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

export const exportarGrafico = async (fileName, valuesX, valuesY) => {
  const configuration = {
    type: "line",
    data: {
      labels: valuesX,
      datasets: [
        {
          label: fileName,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: valuesY,
        },
      ],
    },
    options: {},
    plugins: [],
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  writeFileSync(`${fileName}.png`, image);
};
