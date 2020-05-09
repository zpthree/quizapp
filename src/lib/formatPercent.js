export default function formatPercent(amount) {
  const options = {
    style: 'unit',
    unit: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if ((amount * 100) % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(amount * 100);
}
