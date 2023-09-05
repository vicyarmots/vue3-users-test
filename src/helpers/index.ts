export const scoreChecked = (score: number, selected: string) => {
  if ((selected === '< 10' && score < 10) || (selected === '> 20' && score > 20)) {
    return true
  }

  if (selected === 'Default') {
    return true
  }

  return false
}
