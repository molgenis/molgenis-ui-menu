<template>
  <div id="app" class="mg-page">
    <cookie-wall cookieName="permissionforcookies" />
    <header-component :molgenis-menu="molgenisMenu"/>
    <main class="mg-page-content">
      
      <div class="container">
          <h1 class="mt-5">Page context demo!</h1>
          <div class="row">
              <div class="col-md-9 col-lg-6">
                  <hr>
                  <p>
                  Giant leaps in science don't just appear. they're usually build on the work of others.
                  To accelerate scientific discovery we help teams to make their data open and FAIR to further the open exchange
                  of knowledge.
                  </p>
              </div>
          </div>
      </div>
    </main>
    <footer-component :molgenisFooter="molgenisFooter" class="bg-light"/>
  </div>
</template>

<script>
import Vue from 'vue'
import CookieWall from './components/CookieWall.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import menu from './exampleMenu'
import molgenisFooter from './exampleFooter'

export default Vue.extend({
  name: 'app',
  components: { HeaderComponent, FooterComponent, CookieWall },
  data () {
    return {
      molgenisMenu: menu,
      molgenisFooter: molgenisFooter
    }
  }
})
</script>
