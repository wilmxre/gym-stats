export const useCalendarColors = () => {
  const getBinaryColor = (hasVisit: boolean): string => {
    return hasVisit ? 'bg-accent-500' : 'bg-background-900/50'
  }

  return {
    getBinaryColor
  }
}
