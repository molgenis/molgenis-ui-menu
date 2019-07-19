// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.externals({
      'jquery': 'jQuery',
      'bootstrap': 'bootstrap',
      'popper.js': 'Popper.js'
    })
  },
  devServer: {
    // In CI mode, Safari cannot contact "localhost", so as a workaround, run the dev server using the jenkins agent pod dns instead.
    host: process.env.JENKINS_AGENT_NAME || 'localhost',
    // Do not proxy in production to allow for mocking api response in e2e test ( e2e tests are run in production mode)
    proxy: process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080',
    before: function (app, server) {
      app.get('/api/v2/sys_Language', function (req, res) {
        res.json({
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
        })
      })

      app.get('/app-ui-context', function (req, res) {
        res.json({
          version: '3.2.1-DEV',
          buildDate: '2019-01-25 08:22 UTC',
          additionalMessage: 'some <a href="https://en.wikipedia.org/wiki/All_your_base_are_belong_to_us">additional</a>Message',
          appVersion: 'some-app-version',
          molgenisSite: 'http://www.molgenis.org',
          pubmed1: 'https://www.ncbi.nlm.nih.gov/pubmed/21210979',
          pubmed2: 'https://www.ncbi.nlm.nih.gov/pubmed/17297480',
          showCookieWall: false,
          authenticated: true,
          loginHref: '/login',
          helpLink: {
            label: 'Help',
            href: 'https://molgenis.gitbooks.io/molgenis/content/'
          },
          logoTopMaxHeight: 150,
          navBarLogo: 'https://www.molgenis.org/assets/img/logo_green.png',
          topLogo: 'https://www.molgenis.org/assets/img/logo_green.png',
          topLogoMaxHeight: 150,
          selectedPlugin: 'navigator',
          menu: {
            type: 'menu',
            id: 'main',
            label: 'Home',
            items: [
              {
                type: 'plugin',
                id: 'home',
                label: 'Home'
              },
              {
                type: 'menu',
                id: 'importdata',
                label: 'Import data',
                items: [
                  {
                    type: 'plugin',
                    id: 'one-click-importer',
                    label: 'Quick data import'
                  },
                  {
                    type: 'plugin',
                    id: 'importwizard',
                    label: 'Advanced data import'
                  }
                ]
              },
              {
                type: 'plugin',
                id: 'navigator',
                label: 'Navigator'
              },
              {
                type: 'plugin',
                id: 'dataexplorer',
                label: 'Data Explorer',
                params: 'selectedEntityType=sys_md_EntityType'
              },
              {
                type: 'menu',
                id: 'dataintegration',
                label: 'Data Integration',
                items: [
                  {
                    type: 'plugin',
                    id: 'metadata-manager',
                    label: 'Metadata Manager'
                  },
                  {
                    type: 'menu',
                    id: 'submenu',
                    label: 'Submenu',
                    items: [
                      {
                        type: 'plugin',
                        id: 'sorta',
                        label: 'SORTA'
                      },
                      {
                        type: 'menu',
                        id: 'subsubmenu',
                        label: 'Sub Sub Menu',
                        items: [
                          {
                            type: 'plugin',
                            id: 'background',
                            label: 'Test',
                            'params': ''
                          }
                        ]
                      },
                      {
                        type: 'plugin',
                        id: 'mappingservice',
                        label: 'Mapping Service'
                      }
                    ]
                  },
                  {
                    type: 'plugin',
                    id: 'tagwizard',
                    label: 'Tag Wizard'
                  }
                ]
              },
              {
                type: 'menu',
                id: 'admin',
                label: 'Admin',
                items: [
                  {
                    type: 'plugin',
                    id: 'indexmanager',
                    label: 'Index manager'
                  },
                  {
                    type: 'plugin',
                    id: 'logmanager',
                    label: 'Log manager'
                  },
                  {
                    type: 'plugin',
                    id: 'menumanager',
                    label: 'Menu Manager'
                  },
                  {
                    type: 'plugin',
                    id: 'permissionmanager',
                    label: 'Permission Manager'
                  },
                  {
                    type: 'plugin',
                    id: 'scheduledjobs',
                    label: 'Scheduled Jobs'
                  },
                  {
                    type: 'plugin',
                    id: 'settingsmanager',
                    label: 'Settings'
                  },
                  {
                    type: 'plugin',
                    id: 'thememanager',
                    label: 'Theme Manager'
                  },
                  {
                    type: 'plugin',
                    id: 'usermanager',
                    label: 'User Manager'
                  },
                  {
                    type: 'plugin',
                    id: 'security-ui',
                    label: 'Security Manager'
                  }
                ]
              }
            ]
          }
        })
      })
    }
  }
}
