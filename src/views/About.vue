<template>
  <div>
    <b-container>
      <b-img src="UWM_Wisconsin-logo-444A5D0D3E-seeklogo.com.gif" />
      <h3>INFO ST 440: Web Application Development - Tone Tanate Thangsongcharoen - Links</h3> <br/>
    <b-card-group columns>
    <b-card no-body header="<b>Chapter 1</b>">
      <b-list-group flush>
        <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/Welcome.php" target="_blank">Welcome.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/comments.php" target="_blank">Comments.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/concat.php" target="_blank">Concat.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/constants.php" target="_blank">Constants.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/first.php" target="_blank">First.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/numbers.php" target="_blank">Numbers.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/predefined.php" target="_blank">Predefined.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/quotes.php" target="_blank">Quotes.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/second.php" target="_blank">Second.php</b-list-group-item>
    <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter1/strings.php" target="_blank">Strings.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card no-body header="<b>Chapter 2</b>">
      <b-list-group flush>
        <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/script_02_02/handle_form.php" target="_blank">Script22.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/script_02_03/handle_form.php" target="_blank">Script23.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/script_02_04/handle_form.php" target="_blank">Script24.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/script_02_06/calendar.php" target="_blank">Script26.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/form.html" target="_blank">Script21.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/handle_form.php" target="_blank">Script25.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/multi.php" target="_blank">Multi.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/multi_Sorted.php" target="_blank">Multi_Sorted.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/sorting.php" target="_blank">Sorting.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/Form1.html" target="_blank">Form1</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/Form2.html" target="_blank">Form2</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/EUCountries_I.php" target="_blank">EUCountries_I.php</b-list-group-item>
<b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter2/EUCountries_II.php" target="_blank">EUCountries_II.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card  header="<b>Chapter 3</b>">
      <b-list-group flush>
        <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter3/calculator.php" target="_blank">calculator.php</b-list-group-item>
      </b-list-group>
    </b-card>
    <b-card  header="<b>Chapter 9</b>">
      <b-list-group flush>
        <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter9/htdocs/index.php" target="_blank">index.php</b-list-group-item>
      </b-list-group >
    </b-card>
    <b-card header="<b>Chapter 10</b>">
      <b-list-group flush>
         <b-list-group-item href="http://sabha.uwmsois.com/PHP/Chapter10/htdocs/index.php" target="_blank">index.php</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-card-group>
</b-container>
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
          },
          mounted: function () {
            alert('1');
  this.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered
alert('2');

  })
  return 1;
}
        }
    }
</script>

<style>
