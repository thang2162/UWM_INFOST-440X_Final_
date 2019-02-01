<template>
  <div id="app">
  <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <b-navbar toggleable="md" type="dark" variant="info" style="top:-60px;">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="javascript:void(0)" @click="navigateTo('/')"><b-img alt="Site logo" src="assets/logo2.png" width="40" height="40"/></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="javascript:void(0)" @click="navigateTo('/')">Home</b-nav-item>
      <b-nav-item href="javascript:void(0)" @click="navigateTo('/links')">Links</b-nav-item>
  <!--    <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
    </b-navbar-nav>


    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

<div id="loginForm" v-if="this.$store.getters.getIsLoggedOut">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="email" v-model="userLoginData.username" placeholder="Email"/>
        <b-form-input size="sm" class="mr-sm-2" type="password" v-model="userLoginData.password" placeholder="Password"/>
        <b-button size="sm" class="my-2 my-sm-0"  variant="primary" @click.prevent="login(3000)">Log In</b-button> &nbsp;
        <b-button size="sm" class="my-2 my-sm-0"  variant="warning"  @click.prevent="openSignUpModal">Sign Up</b-button>
 &nbsp;
              <b-nav-item href="javascript:void(0)" @click="openForgotModal">Forgot?</b-nav-item>
      </b-nav-form>

</div>

  <!--    <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown> -->
<div id="loggedinMenu" v-else>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>Logged in as: {{this.$store.state.username}}</em>
        </template>
        <b-dropdown-item href="javascript:void(0)" @click="navigateTo('/my_account')">My Account</b-dropdown-item>
        <b-dropdown-item href="javascript:void(0)" @click="logout(3000)">Log Out</b-dropdown-item>
      </b-nav-item-dropdown>
</div>

    </b-navbar-nav>

  </b-collapse>
</b-navbar>
<BsAlert />
    <router-view/>
    <!--
    <b-footer class="font-small pt-4 mt-4">

      <div class="footer-copyright text-center py-3">
        <b-container fluid>
          <br/><br/><br/>
          &copy; 2018 Copyright: <a href="http://www.thangso2.uwmsois.com" target="_blank"> Tone T. Thangsongcharoen </a>

        </b-container>
      </div>
    </b-footer>
    -->
<Footer linkedin_href="https://www.linkedin.com/in/tone-thangsongcharoen-52bb7266" github_href="https://github.com/thang2162/UWM_INFOST-440X_Final_Project" creatorName="Tone T." :year="currentYear"/>
    <!-- Modal Component -->
      <b-modal hide-footer id="signUpModal"
               ref="signUpModal"
               title="Sign Up"
               @ok="handleOk"
               @shown="clearName">
               <p>Please fill the form below to sign up.</p><br/>

               <b-alert variant="danger" :show="isSignUpValidationError">{{signUpValidationErrorMsg}}</b-alert>

        <form>

          <b-input-group prepend="First Name">
<b-input-group-text slot="append" v-if="firstNameCheckerIsActive">
<strong><font-awesome-icon :style="{ color: firstNameCheckerStyle }" :icon='firstNameCheckerIcon' /></strong>
</b-input-group-text>
<b-form-input type="text"
placeholder="Enter your first name"
v-model="userSignupData.FirstName"
ref='SignUpFirstName'></b-form-input>
</b-input-group>
<br/>

<b-input-group prepend="Last Name&nbsp;">
<b-input-group-text slot="append" v-if="lastNameCheckerIsActive">
<strong><font-awesome-icon :style="{ color: lastNameCheckerStyle }" :icon='lastNameCheckerIcon' /></strong>
</b-input-group-text>
<b-form-input type="text"
placeholder="Enter your last name"
v-model="userSignupData.LastName"
ref='SignUpLastName'></b-form-input>
</b-input-group>
<br/>

                        <b-input-group prepend="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
<b-input-group-text slot="append" v-if="emailCheckerIsActive">
<strong><font-awesome-icon :style="{ color: emailCheckerStyle }" :icon='emailCheckerIcon' /></strong>
</b-input-group-text>
<b-form-input type="email"
              placeholder="Enter your email address"
              v-model="userSignupData.Email"
              ref='SignUpEmail'></b-form-input>
</b-input-group>
<br/>


                                                    <b-input-group prepend="Password&nbsp;&nbsp;&nbsp;">
    <b-input-group-text slot="append" v-if="pwCheckerIsActive">
        <strong><font-awesome-icon :style="{ color: pwCheckerStyle }" :icon='pwCheckerIcon' /></strong>
    </b-input-group-text>
    <b-form-input type="password"
                  placeholder="Enter your password"
                  v-model="userSignupData.Password"
                  ref="SignUpPassword"></b-form-input>
  </b-input-group>
  <br/>

                                                    <b-input-group prepend="Confirm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
    <b-input-group-text slot="append" v-if="pwcCheckerIsActive">
        <strong ><font-awesome-icon :style="{ color: pwcCheckerStyle }" :icon='pwcCheckerIcon' /></strong>
    </b-input-group-text>
    <b-form-input  type="password"
                  placeholder="Confirm your password"
                  v-model="userSignupData.PasswordConfirm"
                  ref='SignUpPasswordConfirm'></b-form-input>
  </b-input-group>

                                                    <br/>
                                                    <b-row>
                                                            <b-col>
                                                            <b-btn class="mt-3" variant="outline-success" block @click.prevent="submitSignUp">Sign Up</b-btn>
                                                          </b-col>
                                                            <b-col>
                                                            <b-btn class="mt-3" variant="outline-danger" block @click="closeSignUpModal">Cancel</b-btn>
                                                          </b-col>
                                                        </b-row>
        </form>
      </b-modal>

      <!-- Modal Component -->
        <b-modal hide-footer id="forgotModal"
                 ref="forgotModal"
                 title="Forgot"
                 @ok="handleOk"
                 @shown="clearName">
                 <p>Enter your email to reset your password.</p><br/>
          <form>

                          <b-input-group prepend="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;">
    <b-input-group-text slot="append" v-if="forgotEmailCheckerIsActive">
    <strong><font-awesome-icon :style="{ color: forgotEmailCheckerStyle }" :icon='forgotEmailCheckerIcon' /></strong>
    </b-input-group-text>
    <b-form-input type="email"
                placeholder="Enter your email address"
                v-model="forgotEmail"></b-form-input>
    </b-input-group>
    <br/>



                                                      <br/>
                                                      <b-row>
                                                              <b-col>
                                                              <b-btn class="mt-3" variant="outline-success" block @click="resetPW">Reset Password</b-btn>
                                                            </b-col>
                                                              <b-col>
                                                              <b-btn class="mt-3" variant="outline-danger" block @click="closeForgotModal">Cancel</b-btn>
                                                            </b-col>
                                                          </b-row>
          </form>
        </b-modal>

  </div>
</template>

<script>


import Footer from '@/components/Footer.vue'
import BsAlert from '@/components/BsAlert.vue'


    export default {
        data () {
            return {
              //  isLoggedOut: this.$store.getters.getIsLoggedOut,
                emailCheckerIsActive: false,
                forgotEmailCheckerIsActive: false,
                pwCheckerIsActive: false,
                pwcCheckerIsActive: false,
                firstNameCheckerIsActive: false,
                lastNameCheckerIsActive: false,
                emailCheckerIcon:'exclamation-triangle',
                forgotEmailCheckerIcon:'exclamation-triangle',
                pwCheckerIcon:'exclamation-triangle',
                pwcCheckerIcon:'exclamation-triangle',
                firstNameCheckerIcon:'exclamation-triangle',
                lastNameCheckerIcon:'exclamation-triangle',
                emailCheckerStyle:'#dc3545',
                forgotEmailCheckerStyle:'#dc3545',
                pwCheckerStyle:'#dc3545',
                pwcCheckerStyle:'#dc3545',
                firstNameCheckerStyle:'#dc3545',
                lastNameCheckerStyle:'#dc3545',
                isSignUpValidationError: false,
                signUpValidationErrorMsg: '',
                userLoginData:{
                  username: '',
                  password: ''
                },
                userSignupData: {
                  Email: '',
                  Password: '',
                  PasswordConfirm: '',
                  FirstName: '',
                  LastName: ''
                },
                forgotEmail: '',
                currentYear: ''
            }
        },
        sockets: {
       connect: function () {
// alert('socket connected')
       },
       socketID: function (data) {
           //alert(JSON.stringify(data));

           this.$store.state.socketID = data["socketID"];
           this.$store.state.clientIP = data["ip"];

          // alert(this.$store.state.socketID + '\n\n' + this.$store.state.clientIP)

          if(sessionStorage.getItem("isLoggedOut") === 'false')
          {

            this.$socket.emit('updateSession', {'socketID': this.$store.state.socketID, 'jwt': sessionStorage.jwt, 'username': sessionStorage.username})
          }
       },
       res_updateSession: function (data) {
           //alert('res_updateSession: ' + JSON.stringify(data));

           if(data["status"] == 'success')
           {
           this.$store.state.isLoggedOut = false;
          this.$store.state.jwt = data["jwt"];
          this.$store.state.username = sessionStorage.username;

          //alert(self.$store.state.jwt)

          sessionStorage.setItem("jwt", data["jwt"]);
          sessionStorage.setItem("isLoggedOut", "false");
          sessionStorage.setItem("username", sessionStorage.username);
          }
          else {
            this.logout(3000);
            alert(data["msg"]);
          }
       }
     },
     mounted: function () {

       var dt = new Date();
       this.currentYear = dt.getFullYear();
      //alert(dt.getFullYear());
     },
        methods: {
          openForgotModal() {
            this.$refs.forgotModal.show()
          },
          closeForgotModal() {
            this.$refs.forgotModal.hide()
          },
          openSignUpModal() {
            this.$refs.signUpModal.show()
          },
          closeSignUpModal() {
            this.$refs.signUpModal.hide()
          },
          navigateTo(pageURL) {
          //  alert(pageURL);
            this.$router.push(pageURL)
          },
          resetPW() {

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

            var payload = {'username': this.forgotEmail};

            formData.append('data', JSON.stringify(payload));

            this.forgotEmail = ''

          //  alert(this.$store.state.apiUrl );

          const self = this;

          this.$refs.forgotModal.hide();


            this.axios.post(this.$store.state.apiUrl + '/requestPasswordReset', formData)
.then(function (response) {

loader.hide();

  if(response.data.status == "success")
  {


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



  }

})
.catch(function (error) {
  alert('error: ' + JSON.stringify(error));
  loader.hide();
});

          },
          submitSignUp(){

            //alert(this.userSignupData.Email + '\n\n' + this.userSignupData.Password + '\n\n' + this.userSignupData.PasswordConfirm);

            if(validate.single(this.userSignupData.Email, {presence: true, email: true}))
            {
              this.isSignUpValidationError = true;
              this.signUpValidationErrorMsg = 'Please enter a valid Email Address';
            }
            else if(this.userSignupData.Password != this.userSignupData.PasswordConfirm)
            {
              this.isSignUpValidationError = true;
              this.signUpValidationErrorMsg = 'Passwords don\'t match';
            }
            else if(this.userSignupData.FirstName == '')
            {
              this.isSignUpValidationError = true;
              this.signUpValidationErrorMsg = 'Please enter a first name.';
            }
            else if(this.userSignupData.LastName == '')
            {
              this.isSignUpValidationError = true;
              this.signUpValidationErrorMsg = 'Please enter a last name';
            }
            else {

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


              this.isSignUpValidationError = false;

              var formData = new FormData();

              var payload = {'username': this.userSignupData.Email, 'password': this.userSignupData.Password, 'firstname': this.userSignupData.FirstName, 'lastname': this.userSignupData.LastName};

              formData.append('data', JSON.stringify(payload));

            //  alert(this.$store.state.apiUrl );

            const self = this;

            this.$refs.signUpModal.hide();


              this.axios.post(this.$store.state.apiUrl + '/newuser', formData)
  .then(function (response) {

loader.hide();

    if(response.data.status == "success")
    {

      self.userSignupData.Email = '';
      self.userSignupData.Password = '';
      self.userSignupData.PasswordConfirm = '';
      self.userSignupData.FirstName = '';
      self.userSignupData.LastName = '';

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



    }

  })
  .catch(function (error) {
    alert('error: ' + JSON.stringify(error));
    loader.hide();
  });
            }



          },
          logout(duration){

            sessionStorage.clear();
            this.$store.state.BsAlert.alertType = 'success';
            this.$store.state.BsAlert.alertMessage = 'You have been logged out!';
            this.$store.state.BsAlert.dismissSecs = 10;
            this.$store.state.BsAlert.dismissCountDown = 10;

this.$store.commit('setIsLoggedOut', true);
this.$store.state.username = '';
this.$store.state.jwt = '';

this.navigateTo('/');

          /*  let loader = this.$loading.show({
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

                // simulate AJAX
              setTimeout(() => {
                loader.hide();


                this.$store.state.BsAlert.alertType = 'success';
                this.$store.state.BsAlert.alertMessage = 'You have been logged out!';
                this.$store.state.BsAlert.dismissSecs = 10;
                this.$store.state.BsAlert.dismissCountDown = 10;
//this.isLoggedOut = true;

this.$store.commit('setIsLoggedOut', true);

this.navigateTo('/');

},duration); */

          },
          login(duration){
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


console.log(duration);


var formData = new FormData();

var payload = {'username': this.userLoginData.username, 'password': this.userLoginData.password, 'socketID': this.$store.state.socketID};

formData.append('data', JSON.stringify(payload));

//  alert(this.$store.state.apiUrl );



const self = this;

this.axios.post(this.$store.state.apiUrl + '/userlogin', formData)
.then(function (response) {

  //alert(JSON.stringify(response))


loader.hide();



if(response.data.status == "success")
{




self.$store.state.jwt = response.data.jwt;
self.$store.state.username = self.userLoginData.username;
self.$store.state.isLoggedOut = false;

//alert(self.$store.state.jwt)

sessionStorage.setItem("jwt", response.data.jwt);
sessionStorage.setItem("isLoggedOut", "false");
sessionStorage.setItem("username", self.userLoginData.username);

self.userLoginData.username = '';
self.userLoginData.password = '';

self.$store.state.BsAlert.alertType = 'success';
self.$store.state.BsAlert.alertMessage = response.data.msg;
self.$store.state.BsAlert.dismissSecs = 10;
self.$store.state.BsAlert.dismissCountDown = 10;



}
else {


//this.closeSignUpModal();
self.userLoginData.password = '';

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


                // simulate AJAX
          /*    setTimeout(() => {
                loader.hide()


                this.$store.state.BsAlert.alertType = 'success';
                this.$store.state.BsAlert.alertMessage = 'You have successfully logged in!';
                this.$store.state.BsAlert.dismissSecs = 10;
this.$store.state.BsAlert.dismissCountDown = 10;
//this.$store.state.isLoggedOut = false;
//this.isLoggedOut = false;

this.$store.commit('setIsLoggedOut', false);

},duration); */

          },
            onLoaderCancel() {
              alert('User cancelled the loader.')
            }
        },
        computed: {
    userSignupDataEmail() {
      return this.userSignupData.Email;
    },
    userSignupDataPasswordConfirm() {
      return this.userSignupData.PasswordConfirm;
    },
    userSignupDataPassword() {
      return this.userSignupData.Password;
    },
    userSignupDataFirstName() {
      return this.userSignupData.FirstName;
    },
    userSignupDataLastName() {
      return this.userSignupData.LastName;
    }

  },
  watch: {
    userSignupDataEmail() {
      if(validate.single(this.userSignupData.Email, {presence: true, email: true}))
      {
        this.emailCheckerIsActive = true;
      }
      else {
        this.emailCheckerIsActive = false;
      }

      this.$nextTick(() => {
        this.$refs.SignUpEmail.focus();
      });

    },
    userSignupDataPasswordConfirm() {
      if(this.userSignupData.PasswordConfirm != this.userSignupData.Password)
      {
        this.pwCheckerIsActive = true;
        this.pwcCheckerIsActive = true;
      }
      else {
        this.pwCheckerIsActive = false;
        this.pwcCheckerIsActive = false;
      }

      this.$nextTick(() => {
      this.$refs.SignUpPasswordConfirm.focus();
      });
    },
      userSignupDataPassword() {
        if(this.userSignupData.PasswordConfirm != this.userSignupData.Password)
        {
          this.pwCheckerIsActive = true;
          this.pwcCheckerIsActive = true;
        }
        else {
          this.pwCheckerIsActive = false;
          this.pwcCheckerIsActive = false;
        }

        this.$nextTick(() => {
        this.$refs.SignUpPassword.focus();
        });
    },
    userSignupDataFirstName() {
      if(this.userSignupData.FirstName == '')
      {
        this.firstNameCheckerIsActive = true;
      }
      else {
        this.firstNameCheckerIsActive = false;
      }

      this.$nextTick(() => {
      this.$refs.SignUpFirstName.focus();
      });
    },
      userSignupDataLastName() {
        if(this.userSignupData.LastName == '')
        {
          this.lastNameCheckerIsActive = true;
        }
        else {
          this.lastNameCheckerIsActive = false;
        }

        this.$nextTick(() => {
        this.$refs.SignUpLastName.focus();
        });
    }
  },
        components: {
          Footer,
          BsAlert
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
