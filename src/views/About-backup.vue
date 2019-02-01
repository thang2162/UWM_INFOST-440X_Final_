<template>
  <div>
  <div class="about">
    <h1>This is an about page</h1>
  </div>


  <body>
    <!-- Our application root element -->
    <div>
      <b-container>
        <b-jumbotron header="Bootstrap Vue"
                     lead="Bootstrap 4 Components for Vue.js 2"
        >
          <p>For more information visit our website</p>
          <b-btn variant="primary" href="https://bootstrap-vue.js.org/">More Info</b-btn>
        </b-jumbotron>

        <b-form-group horizontal
                      :label-cols="4"
                      description="Let us know your name."
                      label="Enter your name"
        >
           <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">
          Hello {{ name }}
        </b-alert>
      </b-container>
    </div>


  </body>
</div>
</template>
<script>
    export default {
        data () {
            return {
                name: ''
            }
        },
        computed: {
          showAlert() {
            return this.name.length > 4 ? true : false;
          }
        }
    }
</script>

<style>
