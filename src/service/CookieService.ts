/**
 * Based on:
 * https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/
 */
export function getCookie (name:string) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

export function setCookie (name:string, value:string, days:number) {
  let d:Date = new Date
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = name + "=" + value + ';path=/;secure: false;expires=' + d.toUTCString()
}

export function deleteCookie (name:string) {
  setCookie(name, '', -1)
}

export default {
  getCookie, setCookie, deleteCookie
}
