export default {
  get: () => Promise.resolve({
    href: '/api/v2/sys_Language',
    meta: {
      languageCode: 'en'
    },
    items: [
      {
        _href: '/api/v2/sys_Language/de',
        code: 'de',
        name: 'Deutsch',
        active: true
      },
      {
        _href: '/api/v2/sys_Language/en',
        code: 'en',
        name: 'English',
        active: true
      }
    ]
  }),
  post: () => Promise.resolve()
}
