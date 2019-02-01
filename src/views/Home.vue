<template>
  <div class="home">
 <b-container>
  <b-row>
        <b-col>
        <b-jumbotron header="INFOST 440x - Final Project"
                     lead="Built using the MEVN stack!"
        >

		<b-img alt="Vue logo" src="assets/logo.png"/>

          <p>For more information click on the button below.</p>
          <b-btn variant="primary" @click="openMoreInfoModal">More Info</b-btn>
        </b-jumbotron>

		</b-col>
        <b-col>
          <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="120"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

    <!-- Slide with blank fluid image to maintain slide aspect ratio -->


<!-- Slides with custom text -->
      <b-carousel-slide img-src="https://img.youtube.com/vi/EE8ZTQxa0AM/maxresdefault.jpg">


           <b-btn variant="primary" @click="openVideoModal('https://www.youtube.com/embed/EE8ZTQxa0AM', 'MongoDB Video')">learn more about MongoDB</b-btn>

      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://img.youtube.com/vi/IjXAr5CJ2Ec/maxresdefault.jpg">

           <b-btn variant="danger" @click="openVideoModal('https://www.youtube.com/embed/IjXAr5CJ2Ec', 'Express Video')">Learn more about Express</b-btn>

      </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://img.youtube.com/vi/p1iLqZnZPdo/maxresdefault.jpg">


           <b-btn variant="success" @click="openVideoModal('https://www.youtube.com/embed/p1iLqZnZPdo', 'Vue.JS Video')">Learn more about Vue.JS</b-btn>

      </b-carousel-slide>


<!-- Slides with custom text -->
      <b-carousel-slide img-src="https://img.youtube.com/vi/uVwtVBpw7RQ/maxresdefault.jpg">


           <b-btn variant="warning" @click="openVideoModal('https://www.youtube.com/embed/uVwtVBpw7RQ', 'Node.JS Video')">Learn more about Node.JS</b-btn>

      </b-carousel-slide>



    </b-carousel>
	<br/>


<b-card bg-variant="light"
                header="About Me"
                class="text-center" style="height:auto;">
				<br/>
            <p class="card-text">Hi, My name is Tone T. Thangsongcharoen. I'm a Full Stack Software Developer, Blockchain Enthusist and IT Guru from Dallas, Texas.</p>
			<br/>
			<b-button href="http://thangso2.uwmsois.com" target="_blank" variant="primary" style="margin-bottom:62px">Visit My Personal Website</b-button>

        </b-card>
		</b-col>
    </b-row>
  </b-container>
  <!-- Modal Component -->
    <b-modal ref="moreInfoModal" hide-footer title="More Info">
     <div class="d-block text-center">
       <h3>Click on the links below to learn more about this revolutionary stack.</h3>
       <br/>
       <b-link href="https://www.mongodb.com/"  target="_blank">MongoDB</b-link>, &nbsp;
       <b-link href="https://expressjs.com/" target="_blank">Express</b-link>, &nbsp;
       <b-link href="https://vuejs.org/"  target="_blank">Vue.JS</b-link>,&nbsp;
       <b-link href="https://nodejs.org/"  target="_blank">Node.JS</b-link> <br/> <br/>

       <p>Also,</p>

       <b-link href="https://bootstrap-vue.js.org/"  target="_blank">Bootstrap-Vue</b-link>
     </div>
     <br/>
     <b-btn class="mt-3" variant="outline-danger" block @click="closeMoreInfoModal">Close</b-btn>
   </b-modal>

  <!-- Modal Component -->
   <b-modal ref="videoModal" size="lg" hide-footer v-bind:title="vidTitle" @hidden="onHidden">

<!-- {{vidSrc}} -->

     <b-embed type="iframe"
              aspect="16by9"
              v-bind:src="vidSrc"
              allowfullscreen
     ></b-embed>
    <br/>
    <b-btn class="mt-3" variant="outline-danger" block @click="closeVideoModal">Close</b-btn>
  </b-modal>


  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data () {
      return {

          vidSrc: '',
          vidTitle: ''
      }
  },
  methods: {
    openMoreInfoModal() {
      this.$refs.moreInfoModal.show()
    },
    closeMoreInfoModal() {
      this.$refs.moreInfoModal.hide()
    },
    openVideoModal(vUrl, vTitle) {


      this.vidSrc = vUrl;
      this.vidTitle = vTitle;
    //  alert(this.vidSrc);
      this.$refs.videoModal.show()
    },
    closeVideoModal() {
      this.$refs.videoModal.hide()
    },
  onHidden (evt) {
    // Return focus to our Open Modal button
    // See accessibility below for additional return-focus methods
    //this.$refs.btnShow.$el.focus()
    this.vidSrc = '';
    this.vidTitle = '';
  }
  }
}
</script>
