export const formatCurrency = (value: number | null) => {
  const price = value || 0
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencySign: 'standard',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  })
  return formatter.format(price)
}
