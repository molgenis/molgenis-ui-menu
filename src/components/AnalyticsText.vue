<template>
  <div v-if="trackingTerm">
    <p class="text-muted text-center small ga-opt-out">
      <em>We use Google Analytics to review this site's usage and improve our services.<br/>
        To optimally protect your privacy we have signed the Data Processing Amendment, masked parts of
        your IP address and disabled data sharing with other Google services.</em><br/>
        <em v-if="!optout">Click <a class="optout" href="#optout" @click="setCookie">here</a> to opt-out of Google Analytics.</em>
        <em v-else>You have opted out of Google Analytics.</em>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AnalyticsText',
  props: {
    trackingId: String,
    trackingIdMolgenis: String
  },
  methods: {
    setCookie () {
      document.cookie = this.cookieName + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/'
      window[this.cookieName] = true
      this.optout = true
    },
    checkCookie () {
      if (document.cookie.indexOf(this.cookieName + '=true') > -1) {
        window[this.cookieName] = true
        this.optout = true
      }
    }
  },
  created () {
    this.checkCookie()
  },
  computed: {
    trackingTerm () {
      return this.trackingId || this.trackingIdMolgenis
    },
    cookieName () {
      return `ga-disable-${this.trackingTerm}`
    }
  },
  data: function () {
    return {
      optout: false
    }
  }
}
</script>
