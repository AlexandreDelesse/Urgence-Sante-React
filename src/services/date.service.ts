const setZoulouToIsoDate = (el: string) =>
  el.charAt(el.length - 1) !== 'Z' ? el + 'Z' : el

export { setZoulouToIsoDate }
