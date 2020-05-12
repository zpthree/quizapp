export default function formatPercent(amount) {
  const options = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if ((amount * 100) % 100 === 0) options.minimumFractionDigits = 0;
  const percent = Number(amount).toLocaleString(undefined, options);

  return percent;
}
