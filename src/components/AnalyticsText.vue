<template>
  <div v-if="trackingTerm">
    <p class="text-muted text-center small ga-opt-out">
      <em>We use Google Analytics to review this site's usage and improve our services.<br/>
        To optimally protect your privacy we have signed the Data Processing Amendment, masked parts of
        your IP address and disabled data sharing with other Google services.</em><br/>
        <em v-if="!optout">Click <a href="#optout" @click="setCookie">here</a> to opt-out of Google Analytics.</em>
        <em>You have opted out of Google Analytics.</em>
    </p>
    <!--
    <script>
      // Set to the same value as the web property used on the site
      const gaProperty = '${app_settings.footer?string}' || '${app_settings.footer?string}';

      // Disable tracking if the opt-out cookie exists.
      const disableStr = 'ga-disable-' + gaProperty;
      if (document.cookie.indexOf(disableStr + '=true') > -1) {
        window[disableStr] = true;
      }

      // Opt-out function
      function gaOptout() {
        document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
        window[disableStr] = true;
      }
    </script>
    -->
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
    }
  },
  created () {
    if (document.cookie.indexOf(this.cookieName + '=true') > -1) {
      window[this.cookieName] = true
      this.optout = true
    }
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
