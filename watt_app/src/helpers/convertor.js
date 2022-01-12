import allTranslations from "../localization/allTranslations";
import localization from "../localization/localization";

const convertorNumber = (value, decimalCount = 0, decimal = " ", thousands = " ") => {
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = value < 0 ? "-" : "";

  let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString();
  let j = (i.length > 3) ? i.length % 3 : 0;

  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : "");
}
const convertorNumberBitness = (value) => {
  value = Number.parseFloat(value);

  let units = [
    allTranslations(localization.convertorBitness.millionShort),
    allTranslations(localization.convertorBitness.billionShort),
    allTranslations(localization.convertorBitness.trillionShort),
    allTranslations(localization.convertorBitness.quadrillionShort),
    allTranslations(localization.convertorBitness.quintillionShort),
    allTranslations(localization.convertorBitness.sextillionShort)
  ];
  let unit = Math.floor((value / 1.0e+1).toFixed(0).toString().length);
  let r = unit%3;
  let x =  Math.abs(Number(value))/Number('1.0e+'+(unit-r)).toFixed(2);

  const unitLabel = units[Math.floor(unit / 3) - 2];


  return `${ x.toFixed(2) }${ unitLabel ? ` ${unitLabel}` : '' }`
}

export {
  convertorNumber,
  convertorNumberBitness
}
