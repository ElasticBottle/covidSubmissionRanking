import { extent } from "d3-array";

export function updateBarMinMaxColor({ data, barsConfig, barColumns = [] }) {
  const barValues = {};
  for (const bar of barColumns) {
    barValues[bar] = { ...barsConfig[bar] };
    const [minVal, maxVal] = extent(data.map((value) => value[bar]));
    barValues[bar].min = minVal;
    barValues[bar].max = maxVal;
  }
  return barValues;
}
