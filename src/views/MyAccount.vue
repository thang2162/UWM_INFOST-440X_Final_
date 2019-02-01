<template>
  <div>
    <b-container>
      <b-card no-body>
  <b-tabs card>
    <b-tab title="My Bookmarks" active>

<b-row>
      <b-col cols="auto" class="mr-auto">
      <b-button variant="primary" @click="showNewBookmarkModal"><font-awesome-icon style='color: white;' icon='plus-circle' />&nbsp;&nbsp;New Bookmark</b-button>

</b-col>
<b-col cols="auto">
      <b-form-group horizontal
                        label="Search:"
                        label-class="text-sm-right"
                        label-for="nestedStreet">
            <b-form-input id="bookmarkSearch" placeholder="Bookmark Name" v-model="bookmarkSearchStr"></b-form-input>
          </b-form-group>

</b-col>
</b-row>
      <b-list-group>
      <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="listObj in listObjs" >
    <!-- <b-link :href="listObj.url" target="_blank">{{listObj.txt}}</b-link>
    <b-button variant="danger" @click="showAlertMsg(listObj.btnNum, listObj.btnVal)" pill><font-awesome-icon style='color: white;' icon='trash-alt' /></b-button> -->
    <b-link :href="listObj.url" target="_blank">{{listObj.name}}</b-link>
    <b-button-group pill>
    <b-button variant="primary" @click="showEditBookmarkModal(listObj.name,listObj.url,listObj._id)" ><font-awesome-icon style='color: white;' icon='edit' /></b-button>
&nbsp;
   <b-button variant="danger" @click="deleteBookmark(listObj._id)" ><font-awesome-icon style='color: white;' icon='trash-alt' /></b-button>
</b-button-group>
  </b-list-group-item>
</b-list-group> <br/>
<b-pagination-nav base-url="#my_account?tab=my_bookmarks&page=" :number-of-pages="numberOfPages_myBookmark" v-model="currentPage_myBookmark" />

    </b-tab>
    <b-tab title="User Directory">

<b-row>
      <b-col cols="auto" class="mr-auto">

</b-col>
<b-col cols="auto">
      <b-form-group horizontal
                        label="Search:"
                        label-class="text-sm-right"
                        label-for="nestedStreet">
            <b-form-input id="userSearch" placeholder="Last Name" v-model="userSearchStr"></b-form-input>
          </b-form-group>

</b-col>
</b-row>
      <b-list-group>
      <b-list-group-item class="d-flex justify-content-between align-items-center"  v-for="userListObj in userListObjs" >
  <span class="d-inline-block" style="max-width: 100%;"> {{userListObj.firstName}}&nbsp;{{userListObj.lastName}}&nbsp;-&nbsp;{{userListObj.username}}</span>
  </b-list-group-item>
</b-list-group> <br/>
<b-pagination-nav base-url="#my_account?tab=my_bookmarks&page=" :number-of-pages="numberOfPages_userDirectory" v-model="currentPage_userDirectory" @click="paginateUsers"/>

    </b-tab>
    <b-tab title="Contact Us">
      <h5>Tone T. Thangsongcharoen</h5>
        <p>2110 Meadow Glen Dr.<br/>Garland, Texas 75044<br/>Email: <a href="mailto:thangso2@uwm.edu?Subject=Hello%20World" target="_top">thangso2@uwm.edu</a></p>
    </b-tab>
  <!--  <b-tab title="Chatroom">
      <div class="chatArea">
        <div class="messages" v-html='messagesListHtml'>
        </div> </div>
      !-- Using components --
<b-input-group prepend="Message">
  <b-form-input></b-form-input>
  <b-input-group-append>
    <b-btn variant="outline-success">Send</b-btn>
  </b-input-group-append>
</b-input-group>
</b-tab> -->
    <b-tab title="Change Password">
      <br/>
      <b-row class="my-1">
  <b-col sm="2"><label for="input-default">Current Password:</label></b-col>
  <b-col sm="10">
    <b-form-input id="input-default" type="password" placeholder="Enter your current password" v-model="changePasswordData.oldPassword"></b-form-input>
  </b-col>

</b-row><br/>
<b-row class="my-1">
  <b-col sm="2"><label for="input-default">New Password:</label></b-col>
  <b-col sm="10">
    <b-form-input id="input-default" type="password" placeholder="Enter your new password" v-model="changePasswordData.newPassword"></b-form-input>
  </b-col>
</b-row>
<br/>
<b-row class="my-1">
  <b-col sm="2"><label for="input-default">Confirm New Password:</label></b-col>
  <b-col sm="10">
    <b-form-input id="input-default" type="password" placeholder="Confirm your new password" v-model="changePasswordData.confirmNewPassword"></b-form-input>
  </b-col>
</b-row>
<b-button variant="primary" @click="changePassword">Change Password</b-button> &nbsp;
<b-button variant="danger" @click="deleteAccount">Delete Account</b-button>
    </b-tab>
  </b-tabs>
</b-card>
</b-container>


<!-- Modal Component -->
  <b-modal hide-footer id="newBookmarkModal"
           ref="newBookmarkModal"
           title="Create New Bookmark"><br/>
<div v-if="newBookMarkData.isLoading">
<b-img  src="loader.gif" fluid alt="Responsive image" height='20px' width='20px' style="margin-bottom:5px;"/>&nbsp;
<span>Saving...</span>
<br/><br/>
</div>
<b-alert :show="newBookMarkData.dismissCountDown"
         dismissible
         :variant="newBookMarkData.alertType"
         @dismissed="newBookMarkData.dismissCountDown=0"
         @dismiss-count-down="countDownChanged">
  {{newBookMarkData.alertMsg}}
  <b-progress variant="warning"
              :max="newBookMarkData.dismissSecs"
              :value="newBookMarkData.dismissCountDown"
              height="4px">
  </b-progress>
</b-alert>

    <form>

      <b-row class="my-1">
<b-col sm="2"><label for="input-default">Bookmark Name:</label></b-col>
<b-col sm="10">
<b-form-input :disabled="newBookMarkData.isLoading" id="input-default" type="text" placeholder="Enter bookmark name" v-model="newBookMarkData.name"></b-form-input>
</b-col>
</b-row>
<br/>


<b-row class="my-1">
<b-col sm="2"><label for="input-default">Bookmark Url:</label></b-col>
<b-col sm="10">
<b-form-input :disabled="newBookMarkData.isLoading" id="input-default" type="text" placeholder="Enter bookmark Url" v-model="newBookMarkData.url"></b-form-input>
</b-col>
</b-row>
<br/>
                                                <b-row>
                                                        <b-col>
                                                        <b-btn :disabled="newBookMarkData.isLoading" class="mt-3" variant="outline-primary" block @click.prevent="createBookmark">Create</b-btn>
                                                      </b-col>
                                                        <b-col>
                                                        <b-btn class="mt-3" variant="outline-secondary" block @click="hideNewBookmarkModal">Done</b-btn>
                                                      </b-col>
                                                    </b-row>
    </form>
  </b-modal>

  <!-- Modal Component -->
    <b-modal hide-footer id="editBookmarkModal"
             ref="editBookmarkModal"
             title="Edit Bookmark"><br/>
  <div v-if="newBookMarkData.isLoading">
  <b-img  src="loader.gif" fluid alt="Responsive image" height='20px' width='20px' style="margin-bottom:5px;"/>&nbsp;
  <span>Saving...</span>
  <br/><br/>
  </div>
  <b-alert :show="newBookMarkData.dismissCountDown"
           dismissible
           :variant="newBookMarkData.alertType"
           @dismissed="newBookMarkData.dismissCountDown=0"
           @dismiss-count-down="countDownChanged">
    {{newBookMarkData.alertMsg}}
    <b-progress variant="warning"
                :max="newBookMarkData.dismissSecs"
                :value="newBookMarkData.dismissCountDown"
                height="4px">
    </b-progress>
  </b-alert>

      <form>

        <b-row class="my-1">
  <b-col sm="2"><label for="input-default">Bookmark Name:</label></b-col>
  <b-col sm="10">
  <b-form-input :disabled="newBookMarkData.isLoading" id="input-default" type="text" placeholder="Enter bookmark name" v-model="newBookMarkData.name"></b-form-input>
  </b-col>
  </b-row>
  <br/>


  <b-row class="my-1">
  <b-col sm="2"><label for="input-default">Bookmark Url:</label></b-col>
  <b-col sm="10">
  <b-form-input :disabled="newBookMarkData.isLoading" id="input-default" type="text" placeholder="Enter bookmark Url" v-model="newBookMarkData.url"></b-form-input>
  </b-col>
  </b-row>
  <br/>
                                                  <b-row>
                                                          <b-col>
                                                          <b-btn :disabled="newBookMarkData.isLoading" class="mt-3" variant="outline-primary" block @click.prevent="editBookmark">Save</b-btn>
                                                        </b-col>
                                                          <b-col>
                                                          <b-btn class="mt-3" variant="outline-danger" block @click="hideEditBookmarkModal">Cancel</b-btn>
                                                        </b-col>
                                                      </b-row>
      </form>
    </b-modal>


</div>
</template>
<script>
    export default {
        data () {
            return {
                name: '',
                messagesListHtml: "<p style='color:blue;'> netguy87@gmail.com: Hello!!! </p><p> superdudenet2162@gmail.com: World!!! </p>",
                currentPage_myBookmark: 1,
                numberOfPages_myBookmark: 10,
                currentPage_userDirectory: 1,
                numberOfPages_userDirectory: 10,
                userDirectoryHTML: '',
                listObjs: [],
                userListObjs: [],
                userSearchStr: '',
                bookmarkSearchStr: '',
                pageLimit: 10,
                newBookMarkData : {
                  name: '',
                  url: '',
                  dismissSecs: 10,
                  alertMsg: '',
                  dismissCountDown: 0,
                  alertType: 'success',
                  isLoading: false,
                  editObjId: ''
                },
                changePasswordData : {
                  newPassword: '',
                  confirmNewPassword: '',
                  oldPassword: ''
                }
            }
        },
        watch: {
   currentPage_userDirectory: function (val) {
     this.currentPage_userDirectory = val;
  //   alert(val);

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

   var payload = {'jwt': this.$store.state.jwt, 'pageNum': val, 'queryStr': this.userSearchStr};

   formData.append('data', JSON.stringify(payload));

   //  alert(this.$store.state.apiUrl );

   const self = this;

   this.axios.post(this.$store.state.apiUrl + '/searchUsers', formData)
   .then(function (response) {

  //alert(JSON.stringify(response))

   loader.hide();



   if(response.data.status == "success")
   {


   self.userListObjs = response.data.users





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
 userSearchStr: function () {


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

 var payload = {'jwt': this.$store.state.jwt, 'pageNum': 1, 'queryStr': this.userSearchStr};



 formData.append('data', JSON.stringify(payload));

 //  alert(this.$store.state.apiUrl );

//alert(JSON.stringify(payload))

 const self = this;

 this.axios.post(this.$store.state.apiUrl + '/searchUsers', formData)
 .then(function (response) {

//alert(JSON.stringify(response))

 loader.hide();



 if(response.data.status == "success")
 {

   var users_pages = 0;

   users_pages = Math.floor(response.data.userCount / self.pageLimit);

   if((response.data.userCount % self.pageLimit) > 0)
   {
     users_pages++;
   }

   if(response.data.userCount == 0)
   {
     users_pages++;
   }


   self.userListObjs = response.data.users
   self.numberOfPages_userDirectory = users_pages




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
currentPage_myBookmark: function (val) {
  this.currentPage_userDirectory = val;

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

var payload = {'jwt': this.$store.state.jwt, 'pageNum': val, 'queryStr': this.bookmarkSearchStr};

formData.append('data', JSON.stringify(payload));

//  alert(this.$store.state.apiUrl );

const self = this;

this.axios.post(this.$store.state.apiUrl + '/searchBookmarks', formData)
.then(function (response) {

//alert(JSON.stringify(response))

loader.hide();



if(response.data.status == "success")
{


self.listObjs = response.data.bookmarks





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
bookmarkSearchStr: function () {


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

var payload = {'jwt': this.$store.state.jwt, 'pageNum': 1, 'queryStr': this.bookmarkSearchStr};



formData.append('data', JSON.stringify(payload));

//  alert(this.$store.state.apiUrl );

//alert(JSON.stringify(payload))

const self = this;

this.axios.post(this.$store.state.apiUrl + '/searchBookmarks', formData)
.then(function (response) {

//alert(JSON.stringify(response))

loader.hide();



if(response.data.status == "success")
{

var bookmarks_pages = 0;

bookmarks_pages = Math.floor(response.data.bookmarkCount / self.pageLimit);

if((response.data.bookmarkCount % self.pageLimit) > 0)
{
  bookmarks_pages++;
}

if(response.data.bookmarkCount == 0)
{
  bookmarks_pages++;
}


self.listObjs = response.data.bookmarks;
self.numberOfPages_myBookmark = bookmarks_pages;




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
alert('error: 1' + JSON.stringify(error));
loader.hide();
});


}
 },
        methods: {
          deleteAccount() {
            //alert(objID);

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

            var payload = {'jwt': this.$store.state.jwt};

            formData.append('data', JSON.stringify(payload));

            //  alert(this.$store.state.apiUrl );

            const self = this;

            this.axios.post(this.$store.state.apiUrl + '/deleteUser', formData)
            .then(function (response) {

              loader.hide();

        //   alert(JSON.stringify(response))


            if(response.data.status == "success")
            {



              self.$store.state.BsAlert.alertType = 'success';
              self.$store.state.BsAlert.alertMessage = response.data.msg;
              self.$store.state.BsAlert.dismissSecs = 10;
              self.$store.state.BsAlert.dismissCountDown = 10;

              sessionStorage.clear();

  self.$store.commit('setIsLoggedOut', true);
  self.$store.state.username = '';
  self.$store.state.jwt = '';

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

          },
          changePassword() {

            if(this.changePasswordData.newPassword == this.changePasswordData.confirmNewPassword && this.changePasswordData.newPassword != '' && this.changePasswordData.confirmNewPassword != '' && this.changePasswordData.oldPassword != ''){

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

            var payload = {'jwt': this.$store.state.jwt, 'oldPassword': this.changePasswordData.oldPassword, 'newPassword': this.changePasswordData.newPassword};

            formData.append('data', JSON.stringify(payload));

            //  alert(this.$store.state.apiUrl );
            this.changePasswordData.newPassword = "";
            this.changePasswordData.confirmNewPassword = "";
            this.changePasswordData.oldPassword = "";

            const self = this;

            this.axios.post(this.$store.state.apiUrl + '/changePassword', formData)
            .then(function (response) {

loader.hide();
        //   alert(JSON.stringify(response))


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

          }
        }
        else {
          this.$store.state.BsAlert.alertType = 'danger';
          this.$store.state.BsAlert.alertMessage = "All Fields must be filled and new passwords must match!";
          this.$store.state.BsAlert.dismissSecs = 10;
          this.$store.state.BsAlert.dismissCountDown = 10;
        }

          },
          deleteBookmark(objID) {
            //alert(objID);

            var r = confirm("Are You Sure?");

            if (r == true){

            var formData = new FormData();

            var payload = {'jwt': this.$store.state.jwt, '_id': objID};

            formData.append('data', JSON.stringify(payload));

            //  alert(this.$store.state.apiUrl );

            const self = this;

            this.axios.post(this.$store.state.apiUrl + '/deleteBookmark', formData)
            .then(function (response) {

        //   alert(JSON.stringify(response))


            if(response.data.status == "success")
            {



                for(var i=0; i<self.listObjs.length; i++)
                {
                  if(self.listObjs[i]._id === response.data.bookmark._id)
                  {
                    self.listObjs.splice(i, 1);

                    if(self.listObjs.length <= 0){
                      self.currentPage_myBookmark--
                    }
                  }
                }

                var bookmarks_pages = 0;

                bookmarks_pages = Math.floor(response.data.bookmarkCount / self.pageLimit);

                if((response.data.bookmarkCount % self.pageLimit) > 0)
                {
                  bookmarks_pages++;
                }

                if(bookmarks_pages<=0)
                {
                  bookmarks_pages = 1;
                }

                self.numberOfPages_myBookmark = bookmarks_pages



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

        },editBookmark() {

            this.newBookMarkData.isLoading = true;

            var bookmarkName = this.newBookMarkData.name;
            var editObjId = this.newBookMarkData.editObjId;

          var formattedUrl = this.newBookMarkData.url;

          if(validate({website: formattedUrl}, {website: {url: true}}))
          {
            formattedUrl = 'http://' + this.newBookMarkData.url;
          }

          var formData = new FormData();

          var payload = {'jwt': this.$store.state.jwt, 'name': bookmarkName, 'url': formattedUrl, 'objID': editObjId};

          formData.append('data', JSON.stringify(payload));

          //  alert(this.$store.state.apiUrl );

          const self = this;

          this.axios.post(this.$store.state.apiUrl + '/editbookmark', formData)
          .then(function (response) {

         //alert(JSON.stringify(response))
         self.hideEditBookmarkModal();


          if(response.data.status == "success")
          {

            for(var i=0; i<self.listObjs.length; i++)
            {
              if(self.listObjs[i]._id === editObjId)
              {
              //  alert(bookmarkName + "\n" + editObjId + "\n"+ formattedUrl);
              //  alert(JSON.stringify(self.listObjs[i]))
                self.listObjs.splice(i, 1, {'name': bookmarkName, 'url': formattedUrl, '_id': editObjId});

              }
            }

            self.newBookMarkData.name = '';
            self.newBookMarkData.url = '';
            self.newBookMarkData.editObjId = '';

            self.newBookMarkData.isLoading = false;

            self.newBookMarkData.alertType = 'success';
            self.newBookMarkData.alertMsg = response.data.msg;
            self.newBookMarkData.dismissSecs = 10;
            self.newBookMarkData.dismissCountDown = 10;


          }
          else {


          //this.closeSignUpModal();
          self.newBookMarkData.isLoading = false;

          self.newBookMarkData.alertType = 'danger';
          self.newBookMarkData.alertMsg = response.data.msg;
          self.newBookMarkData.dismissSecs = 10;
          self.newBookMarkData.dismissCountDown = 10;


          }

          })
          .catch(function (error) {
          alert('error: ' + JSON.stringify(error));
          loader.hide();
          });

          },
          createBookmark() {

            this.newBookMarkData.isLoading = true;

          var formattedUrl = this.newBookMarkData.url;

          if(validate({website: formattedUrl}, {website: {url: true}}))
          {
            formattedUrl = 'http://' + this.newBookMarkData.url;
          }

          var formData = new FormData();

          var payload = {'jwt': this.$store.state.jwt, 'name': this.newBookMarkData.name, 'url': formattedUrl};

          formData.append('data', JSON.stringify(payload));

          //  alert(this.$store.state.apiUrl );

          const self = this;

          this.axios.post(this.$store.state.apiUrl + '/newbookmark', formData)
          .then(function (response) {

         //alert(JSON.stringify(response))



          if(response.data.status == "success")
          {

            var bookmarkListObj = {};

            bookmarkListObj.name = self.newBookMarkData.name;
            bookmarkListObj.url = formattedUrl;
            bookmarkListObj._id = response.data.objID;

            if(self.listObjs.length < self.pageLimit)
            {
              self.listObjs.push(bookmarkListObj)
          }
              var bookmarks_pages = 0;

              bookmarks_pages = Math.floor(response.data.bookmarkCount / self.pageLimit);

              if((response.data.bookmarkCount % self.pageLimit) > 0)
              {
                bookmarks_pages++;
              }

              if(bookmarks_pages<=0)
              {
                bookmarks_pages = 1;
              }

              self.numberOfPages_myBookmark = bookmarks_pages


            self.newBookMarkData.name = '';
            self.newBookMarkData.url = '';

            self.newBookMarkData.isLoading = false;

            self.newBookMarkData.alertType = 'success';
            self.newBookMarkData.alertMsg = response.data.msg;
            self.newBookMarkData.dismissSecs = 10;
            self.newBookMarkData.dismissCountDown = 10;


          }
          else {


          //this.closeSignUpModal();
          self.newBookMarkData.isLoading = false;

          self.newBookMarkData.alertType = 'danger';
          self.newBookMarkData.alertMsg = response.data.msg;
          self.newBookMarkData.dismissSecs = 10;
          self.newBookMarkData.dismissCountDown = 10;


          }

          })
          .catch(function (error) {
          alert('error: ' + JSON.stringify(error));
          loader.hide();
          });

          },
          countDownChanged (dismissCountDown) {
      this.newBookMarkData.dismissCountDown = dismissCountDown
    },
          showAlertMsg(val, val2) {
            alert(val + " " + val2);
          },
          showNewBookmarkModal () {
      this.$refs.newBookmarkModal.show()
    },
    hideNewBookmarkModal () {
      this.$refs.newBookmarkModal.hide()
    },
    showEditBookmarkModal (name, url, objID) {
      //alert(objID)
      this.newBookMarkData.name = name;
      this.newBookMarkData.url = url;
      this.newBookMarkData.editObjId = objID;
this.$refs.editBookmarkModal.show()
},
hideEditBookmarkModal () {
  this.newBookMarkData.name = '';
  this.newBookMarkData.url = '';
this.$refs.editBookmarkModal.hide()
}
        },
        computed: {
          showAlert() {
            return this.name.length > 4 ? true : false;
          }
        },
        mounted: function () {


              //alert('myAccount: ' + this.$store.state.isLoggedOut);

if(sessionStorage.isLoggedOut === 'false')
{
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

var payload = {'jwt': sessionStorage.jwt};

formData.append('data', JSON.stringify(payload));

//  alert(this.$store.state.apiUrl );



const self = this;

this.axios.post(this.$store.state.apiUrl + '/dispAcctPage', formData)
.then(function (response) {

//(JSON.stringify(response))

loader.hide();



if(response.data.status == "success")
{

  var users_pages = 0;
  var bookmarks_pages = 0;

  users_pages = Math.floor(response.data.userCount / self.pageLimit);

  if((response.data.userCount % self.pageLimit) > 0)
  {
    users_pages++;
  }

  if(users_pages<=0)
  {
    users_pages = 1;
  }

  bookmarks_pages = Math.floor(response.data.bookmarkCount / self.pageLimit);

  if((response.data.bookmarkCount % self.pageLimit) > 0)
  {
    bookmarks_pages++;
  }

  if(bookmarks_pages<=0)
  {
    bookmarks_pages = 1;
  }
self.userListObjs = response.data.users
self.numberOfPages_userDirectory = users_pages

self.listObjs = response.data.bookmarks
self.numberOfPages_myBookmark = bookmarks_pages





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
}
else {

    this.$router.push('/')

}

      /*    alert('1');
this.$nextTick(function () {
  // Code that will run only after the
  // entire view has been rendered
alert('2');


})*/
return 1;
}
    }
</script>

<style>
/* Fix user-agent */

* {
  box-sizing: border-box;
}


/* Font */

.messages {
  font-size: 100%;
  text-align: left;
}


/* Messages */

.chatArea {
  height: 535px;
  padding-bottom: 60px;
}

.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 5px 10px 5px 10px;
}

</style>

<style>
