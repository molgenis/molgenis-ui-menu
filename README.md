[![codecov](https://codecov.io/gh/molgenis/molgenis-js-i18n/branch/master/graph/badge.svg)](https://codecov.io/gh/molgenis/molgenis-js-i18n)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# molgenis-ui-context

Collection of top level page components for use in MOLGENIS interface

- Page component (Renders full MOLGENIS page and handles comunication with server via 'context' endpoint)
  - Cookie wall
  - Header component
  - Footer compoment

## Installation
- Use yarn/npm to include the @molgenis-ui-context module
- Include sticky-footer.css when using PageComponent or FooterComponent
- Include boostrap, jquery and poppers.js if you want to use the bootstrap navbar ( included in the page) 
  - How to include using vue cli 3 https://developpaper.com/using-jquery-and-bootstrap-in-vue-cli-3-0/

## Usage
You can use this library in 2 different ways. You use the source components from ui-context.

```html
<page-component>
    <p>I am a MOLGENIS page with, header and footer</p>
</page-component>
```
- Header component (Allows for more controller passing in menu and settings as props)
  - Header image component
  - Navbar
- Footer compoment (Allows for more controller passing settings as props)
- Cookie wall 

> HeaderImageComponent may also be used as separate components
> Please be sure to build your project and include  the peer dependencies (check [installation](#installation)).

The second way is to import the umd's, but Vue and the peer dependencies are packaged as well. This means you have to import the umd modules in a separate Vue in the page.

```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>

<script>
  requirejs.config({
    baseUrl: '/@molgenis-ui/context/dist/'
  });

  requirejs(["context.umd", "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"], function(context, Vue) {
    new Vue({
        render: createElement => {
          const propsData = {
            props: {
              molgenisMenu: {
                menu: ${menu},
                <#if app_settings.logoTopHref??>topLogo: '${app_settings.logoTopHref}', </#if>
                <#if app_settings.logoTopHref??>topLogoMaxHeight: ${app_settings.logoTopMaxHeight}, </#if>
                <#if app_settings.logoNavBarHref?has_content>navBarLogo: '${app_settings.logoNavBarHref}', </#if>
                <#if plugin_id??>selectedPlugin: '${plugin_id}', </#if>
                authenticated: ${authenticated?c},
                loginHref: '/login',
                helpLink: {
                label: 'Help',
                href: 'https://molgenis.gitbooks.io/molgenis/content/'
              }
            }
          }
        };
        return createElement(context.default.HeaderComponent, propsData);
      }
    }).$mount('#molgenis-menu')
  })
</script>
```

### Vuex
If you use [Vuex](https://vuex.vuejs.org/), the `fetchContext` action will retrieve the values for the component props from the context API.
It returns a promise that resolves when the context has been fetched.

```
import { store } from '@molgenis/molgenis-ui-context'
const store = new Vuex.Store(store)
store.dispatch('fetchContext')
```

Once fetched, the context will be available in `store.state.context`.

The getters map the context to the props, i.e. the `molgenisMenu` prop to set on the `HeaderComponent` can be retrieved from `store.getters.molgenisMenu`

If you already have a store, you can combine the context store with your own store as a vuex [module](https://vuex.vuejs.org/guide/modules.html).

## Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/molgenis/molgenis-ui-context/blob/master/CHANGELOG.md).

## Components

#### Page Component
Combination of 'Cookie wall', 'Header component' and 'Footer compoment'.
Emits 'contextLoaded' event containing contextData when data is returned from backend. 


#### Header component
Sticky header that contains HeaderImageComponent and Navbar.
Takes a MOLGENIS menu object as property and renders a menu and top logo image (if set MOLGENIS menu object). Header is fixed at the top of the page).

#### Footer compoment
Sticky footer, takes a MOLGENIS footer object as property and renders a footer.
Footers is rendered at the botom of the window and pushed down by the content.

#### Cookie wall
Shows cookie warning if 'permissionforcookies' cookie is not set. If user accepts cookies the 'permissionforcookies' is set. 

## Page layout

      ------------------------------------------
      | page                                   |
      |  ------------------------------------  |
      |  | sticky-header                    |  |
      |  | -------------------------------  |  |
      |  | | header-image                |  |  |
      |  | |                             |  |  |
      |  | -------------------------------  |  |
      |  | -------------------------------  |  |
      |  | | nav-bar                     |  |  |
      |  | -------------------------------  |  |
      |  ------------------------------------  |
      |  ------------------------------------  |
      |  | content                          |  |
      |  |                                  |  |
      |  |                                  |  |
      |  |                                  |  |
      |  |                                  |  |
      |  |                                  |  |
      |  |                                  |  |
      |  ------------------------------------  |
      |  ------------------------------------  |
      |  |footer                            |  |
      |  |                                  |  |
      |  |                                  |  |
      |  ------------------------------------  |
      ------------------------------------------
 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

The default build target is set to build the all tlhe components as library

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### How to commit
We use conventional commits to generate changelogs and release notes. Please check: https://www.conventionalcommits.org/

**Example**
```
git commit file.ext -m "fix(file.ext): fixes something"
```

### How to publish
Each time a PR is merged a release will be done to NPM. The CHANGELOG.md and GitHub release will be ammended. 

The version of the package is based upon convential commits. Check: http://commitizen.github.io/cz-cli/.

