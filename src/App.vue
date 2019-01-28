<template>
  <div id="app">
    <CookieWall cookieName="permissionforcookies" />
    <NavBar :molgenis-menu="molgenisMenu"></NavBar>
    <img alt="Vue logo" src="./assets/logo.png">
    <FooterComponent :molgenisFooter="molgenisFooter"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from './components/NavBar.vue'
import CookieWall from './components/CookieWall.vue'
import FooterComponent from './components/FooterComponent.vue'
import menu from './exampleMenu'
import molgenisFooter from './exampleFooter'

export default Vue.extend({
  name: 'app',
  components: { NavBar, CookieWall, FooterComponent },
  data () {
    return {
      molgenisMenu: menu,
      molgenisFooter: molgenisFooter
    }
  }
})
</script>
