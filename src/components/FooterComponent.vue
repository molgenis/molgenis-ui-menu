<template>
  <footer class="footer">
    <div class="container">
      <p class="font-italic text-muted text-center">
        <span v-if="additionalMessage">
          {{additionalMessage}}<br/>
        </span>

        This database was generated using the open source <a :href="molgenisSite">MOLGENIS database generator </a>
        <span
          v-if="version">{{version}}</span> <span v-if="buildDate">built on {{buildDate}}. </span>
        <span v-if="appVersion">App version: {{appVersion}}. </span>
        <br/> Please cite <a :href="pubmed1">Swertz et al (2010)</a> or <a :href="pubmed2">Swertz &amp; Jansen
        (2007)</a> on use.
      </p>
    </div>
  </footer>
</template>

<style>
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

</style>
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
      pubmed1: this.molgenisFooter.pubmed1,
      pubmed2: this.molgenisFooter.pubmed2
    }
  }
}
</script>
