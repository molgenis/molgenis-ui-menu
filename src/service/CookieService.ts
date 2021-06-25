/**
 * Based on:
 * https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
 */

export function setCookie (name:string, value:string, days:number) {
  const expirationDate:Date = new Date()
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + '=' + value + ';path=/;secure: false;expires=' + expirationDate.toUTCString()
}

export function deleteCookie (name:string) {
  setCookie(name, '', -1)
}

// Extracts a value by key in a "key=value; key=value2;" list
export function findValueInList (haystack:string, needle:string):string|null {
  const capturingGroupOffset:number = 2
  const value:RegExpMatchArray|null = haystack.match('(^|;) ?' + needle + '=([^;]*)(;|$)')
  return value ? value[capturingGroupOffset] : null
}

export default {
  setCookie, deleteCookie, findValueInList
}
