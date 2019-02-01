<template>

  <footer class="footer">
      <b-container fluid class="text-center" style="color:#343a40;">
        <b-row>
    <b-col cols="auto"><!--{{linkedin_href}}--></b-col>
      <b-col>© {{year}} {{creatorName}}
  <!--  <a href="http://thangso2.uwmsois.com/" style="color:white;"> Tone T. Thangsongcharoen</a> --></b-col>
    <b-col cols="auto" class="ml-auto"><b-link v-bind:href="github_href" target="_blank"><b-img src="github-square-brands.svg" height="28" width="28" /></b-link><b-link v-bind:href="linkedin_href" target="_blank"><b-img src="linkedin-brands.svg" height="28" width="28" /></b-link></b-col>
  </b-row>
      </b-container>

    </footer>

</template>

<script>
export default {
  name: 'Footer'
,props: {
    github_href: String,
    linkedin_href: String,
    creatorName: String,
    year: String
  }
}
</script>

<style>
.footer {
  position: relative;
  bottom: -120px;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #e9ecef;
}
</style>
