export function rankData(data) {
  return data.map((val, index) => {
    return { ...val, rank: index + 1 };
  });
}
