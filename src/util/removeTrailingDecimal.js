export function removeTrailingDecimals(result, fields) {
  for (const item of result) {
    fields.forEach((field) => {
      item[field.name] = item[field.name].toFixed(field.rounding);
    });
  }
  return result;
}
