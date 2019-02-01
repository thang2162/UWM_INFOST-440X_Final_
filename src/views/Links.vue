<template>
  <div>
    <b-container>
      <b-img src="UWM_Wisconsin-logo-444A5D0D3E-seeklogo.com.gif" />
      <h3>INFOST 440: Web Application Development - Tone Tanate Thangsongcharoen - Links</h3> <br/>
    <b-card-group columns>
    <b-card no-body header="<b>Chapter 1</b>">
      <b-list-group flush>
        <b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter1/Welcome.php" target="_blank">Welcome.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card no-body header="<b>Chapter 2</b>">
      <b-list-group flush>
<b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter2/Multi_Sorted.php" target="_blank">Multi_Sorted.php</b-list-group-item>
<b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter2/Form1.html" target="_blank">Form1</b-list-group-item>
<b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter2/Form2.html" target="_blank">Form2</b-list-group-item>
<b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter2/EUCountries.php" target="_blank">EUCountries.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card  header="<b>Chapter 3</b>">
      <b-list-group flush>
        <b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter3/calculator.php" target="_blank">calculator.php</b-list-group-item>
          <b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter3/index.php" target="_blank">index.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card  header="<b>Chapter 9</b>">
      <b-list-group flush>
        <b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter9/htdocs/index.php" target="_blank">index.php</b-list-group-item>
      </b-list-group >
    </b-card>
    <b-card header="<b>Chapter 10</b>">
      <b-list-group flush>
         <b-list-group-item href="https://thangso2.uwmsois.com/PHP_Flex/Chapter10/htdocs/index.php" target="_blank">index.php</b-list-group-item>
      </b-list-group>
    </b-card>

  </b-card-group>
</b-container>
<br/>
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
