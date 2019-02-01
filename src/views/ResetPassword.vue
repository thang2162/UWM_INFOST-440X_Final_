<template>
  <div>
  <div class="about">
    <h1>Reset your password!</h1>
  </div>

<br/>
  <body>
    <!-- Our application root element -->
    <div>
      <b-container>
    <b-form>
        <b-form-group horizontal
                      :label-cols="4"
                      description="Please enter a new password."
                      label="New password"
        >
           <b-form-input type="password" v-model.trim="password"></b-form-input>

     </b-form-group>

     <b-form-group horizontal
                   :label-cols="4"
                   description="Please confirm your nwe password."
                   label="Confirm new password"
     >
        <b-form-input type="password" v-model.trim="confirmPassword"></b-form-input>

  </b-form-group>

  <b-button size="sm" class="my-2 my-sm-0"  variant="primary" @click.prevent="submitNewPW">Submit</b-button>

   </b-form>

        <b-alert :variant="alertType" :if="isAlert">
         {{ alertMessage }}
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
                password: '',
                confirmPassword: '',
                isAlert: false,
                alertMessage: '',
                resetKey: '',
                username: '',
                alertType: 'danger'
            }
        },
        methods: {
          submitNewPW() {
            //(this.password + "\n\n" + this.confirmPassword);
            if(this.password == this.confirmPassword && this.password != '' && this.confirmPassword != ''){

            var r = confirm("Are You Sure?");

            if (r == true){

              let loader = this.$loading.show({
                    // Optional parameters
                    container: this.$refs.formContainer,
                    canCancel: false,
                    onCancel: this.onLoaderCancel,
                    color: '#000000',
            loader: 'spinner',
            width: 64,
            height: 64,
            backgroundColor: '#ffffff',
            opacity: 0.5
                  });

            var formData = new FormData();

            var payload = {'newPassword': this.password, 'username': this.username, 'resetKey': this.resetKey};

            formData.append('data', JSON.stringify(payload));

            //  alert(this.$store.state.apiUrl );
            this.password = "";
            this.confirmPassword = "";
            this.username = '';
            this.resetKey = '';

            const self = this;

            this.axios.post(this.$store.state.apiUrl + '/submitResetPassword', formData)
            .then(function (response) {

loader.hide();
        //   alert(JSON.stringify(response))


            if(response.data.status == "success")
            {


              self.$store.state.BsAlert.alertType = 'success';
              self.$store.state.BsAlert.alertMessage = response.data.msg;
              self.$store.state.BsAlert.dismissSecs = 10;
              self.$store.state.BsAlert.dismissCountDown = 10;

              self.$router.push('/');

            }
            else {


            //this.closeSignUpModal();

            self.$store.state.BsAlert.alertType = 'danger';
            self.$store.state.BsAlert.alertMessage = response.data.msg;
            self.$store.state.BsAlert.dismissSecs = 10;
            self.$store.state.BsAlert.dismissCountDown = 10;


            }

            })
            .catch(function (error) {
            alert('error: ' + JSON.stringify(error));
            loader.hide();
            });

          }
        }
        else {
          this.$store.state.BsAlert.alertType = 'danger';
          this.$store.state.BsAlert.alertMessage = "New passwords must match!";
          this.$store.state.BsAlert.dismissSecs = 10;
          this.$store.state.BsAlert.dismissCountDown = 10;
        }

          }
        },
        mounted: function () {
        //  alert(this.$route.query.key + "\n\n" + this.$route.query.user); //format is https://url.com/reset_password?key=somekey&user=someuser


          let loader = this.$loading.show({
                // Optional parameters
                container: this.$refs.formContainer,
                canCancel: false,
                onCancel: this.onLoaderCancel,
                color: '#000000',
loader: 'spinner',
width: 64,
height: 64,
backgroundColor: '#ffffff',
opacity: 0.5
              });


          var formData = new FormData();

          var payload = {'username': this.$route.query.user, 'resetKey': this.$route.query.key};

          formData.append('data', JSON.stringify(payload));


        //  alert(this.$store.state.apiUrl );

        const self = this;


          this.axios.post(this.$store.state.apiUrl + '/verifyPasswordReset', formData)
.then(function (response) {

loader.hide();

if(response.data.status == "success")
{

  self.username = self.$route.query.user;
  self.resetKey = self.$route.query.key

  self.$store.state.BsAlert.alertType = 'success';
  self.$store.state.BsAlert.alertMessage = response.data.msg;
  self.$store.state.BsAlert.dismissSecs = 10;
  self.$store.state.BsAlert.dismissCountDown = 10;



}
else {


  //this.closeSignUpModal();


  self.$store.state.BsAlert.alertType = 'danger';
  self.$store.state.BsAlert.alertMessage = response.data.msg;
  self.$store.state.BsAlert.dismissSecs = 10;
  self.$store.state.BsAlert.dismissCountDown = 10;

self.$router.push('/');

}

})
.catch(function (error) {
alert('error: ' + JSON.stringify(error));
loader.hide();
});
}
    }
</script>

<style>
