export default {
  /**
   * Custom simplified debounce method based on lodash, to save bundle size.
   *
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds.
   */
  debounce (func: Function, wait: number) {
    let timeout: number | null
    return (...args: any[]) => {
      const context = this
      const later = () => {
        timeout = null
        func.apply(context, args)
      }
      const callNow = !timeout
      if (timeout !== null) {
        clearTimeout(timeout)
      }
      timeout = window.setTimeout(later, wait)
      if (callNow) {
        func.apply(context, args)
      }
    }
  }
}
