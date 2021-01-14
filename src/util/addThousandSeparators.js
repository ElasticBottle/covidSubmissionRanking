export function addThousandSeparators(result, fields) {
  for (const item of result) {
    typeof fields === "string"
      ? (item[fields] = addThousandSeparator(item[fields]))
      : fields.forEach((field) => {
          item[field] = addThousandSeparator(item[field]);
        });
  }
  return result;
}
// Credit to http://www.mredkj.com/javascript/nfbasic.html
function addThousandSeparator(value = "") {
  const valueString = value.toString();
  const x = valueString.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? "." + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  return x1.concat(x2);
}
