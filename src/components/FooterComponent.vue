<template>
  <footer class="footer">
    <div class="container font-italic text-muted text-center">
      <div class="mg-additional-footer-message" v-if="additionalMessage" v-html="additionalMessage">
      </div>
      <div>
        This database was generated using the open source <a :href="molgenisSite">MOLGENIS database generator </a>
        <span v-if="version">
          {{version}}
        </span>
        <span v-if="buildDate">
          built on {{buildDate}}.
        </span>
      </div>
      <div v-if="appVersion">
        App version: {{appVersion}}.
      </div>
      <p>
        Please cite <a href="https://www.ncbi.nlm.nih.gov/pubmed/30165396">Van der Velde et al (2018)</a>, <a href="https://www.ncbi.nlm.nih.gov/pubmed/21210979">Swertz et al (2010)</a> or <a href="https://www.ncbi.nlm.nih.gov/pubmed/17297480">Swertz &amp; Jansen(2007)</a> on use.
      </p>
    </div>
    <div v-if="googleAnalyticsTrackingId || googleAnalyticsTrackingIdMolgenis">
      <p class="text-muted text-center small ga-opt-out">
        <em>We use Google Analytics to review this site's usage and improve our services.<br/>
          To optimally protect your privacy we have signed the Data Processing Amendment, masked parts of
          your IP address and disabled data sharing with other Google services.</em><br/>
        <em>Click <a href="javascript:gaOptout()">here</a> to opt-out of Google Analytics.</em>
      </p>
      <p class="text-muted text-center small ga-opted-out hidden">
        <em>You have opted out of Google Analytics.</em>
      </p>
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
    </div>
  </footer>
</template>

<script>

import { MolgenisFooter } from '../types'
export default {
  name: 'FooterComponent',
  props: {
    molgenisFooter: MolgenisFooter
  },
  data: function () {
    return {
      additionalMessage: this.molgenisFooter.additionalMessage,
      version: this.molgenisFooter.version,
      buildDate: this.molgenisFooter.buildDate,
      appVersion: this.molgenisFooter.appVersion,
      molgenisSite: this.molgenisFooter.molgenisSite,
      googleAnalyticsTrackingId: this.molgenisFooter.googleAnalyticsTrackingId,
      googleAnalyticsTrackingIdMolgenis: this.molgenisFooter.googleAnalyticsTrackingIdMolgenis
    }
  }
}
</script>
