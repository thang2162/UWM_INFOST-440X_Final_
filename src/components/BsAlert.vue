<template>

      <b-container>
        <b-alert :show="this.$store.state.BsAlert.dismissCountDown"
                    dismissible
                    :variant="this.$store.state.BsAlert.alertType"
                    @dismissed="this.$store.state.BsAlert.dismissCountDown=0"
                    @dismiss-count-down="countDownChanged">
             <p>{{this.$store.state.BsAlert.alertMessage}}</p>
             <b-progress variant="warning"
                         :max="this.$store.state.BsAlert.dismissSecs"
                         :value="this.$store.state.BsAlert.dismissCountDown"
                         height="4px">
             </b-progress>
           </b-alert>
      </b-container>


</template>

<script>
export default {
  name: 'BsAlert',
  methods: {
      countDownChanged (dismissCountDown) {
  this.$store.state.BsAlert.dismissCountDown = dismissCountDown
}
  }
}
</script>

<style>
</style>
