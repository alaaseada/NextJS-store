import { cn } from '@/lib/utils'

const DateInfo = ({ date, className }: { date: Date; className?: string }) => {
  const durationMilliseconds = Math.abs(Date.now().valueOf() - date.valueOf())
  let result
  let unit

  const diffHours = Math.floor(durationMilliseconds / (1000 * 60 * 60))
  if (diffHours >= 24) {
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays >= 7) {
      const diffWeeks = Math.floor(diffDays / 7)
      if (diffWeeks >= 4) {
        const diffMonths = Math.floor(diffWeeks / 4)
        if (diffMonths >= 12) {
          const diffYears = Math.floor(diffMonths / 12)
          result = diffYears
          unit = 'Year'
          return
        }
        result = diffMonths
        unit = 'Month'
        return
      }
      result = diffWeeks
      unit = 'Week'
      return
    }
    result = diffDays
    unit = 'Day'
  } else {
    result = diffHours
    unit = 'Hour'
  }
  return (
    <p className={cn('text-xs', className)}>
      {result} {unit}
      {result > 1 && 's ago'}
    </p>
  )
}
export default DateInfo
