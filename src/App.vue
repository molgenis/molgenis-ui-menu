<template>
  <page-component id="app">
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
    </page-component>
</template>

<script>
import Vue from 'vue'
import PageComponent from './components/PageComponent.vue'

export default Vue.extend({
  name: 'app',
  components: { PageComponent }
})
</script>
