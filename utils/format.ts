export const formatCurrency = (value: number | null) => {
  const price = value || 0
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
    currencySign: 'standard',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 2,
  })
  return formatter.format(price)
}

export const formatDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return dateFormatter.format(date)
}
