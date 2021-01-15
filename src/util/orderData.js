import { sort } from "d3-array";

export function orderData(rankBy, data, order) {
  return sort(data, (a, b) => {
    return order === "ASC" ? a[rankBy] - b[rankBy] : b[rankBy] - a[rankBy];
  });
}
