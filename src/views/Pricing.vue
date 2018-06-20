<template>

  <div>
      <div id="pricing">CloudCite Will be Free Forever!</div>
      <div id ="source_code">Check Out Our Source Code. </div>
      <a href="https://github.com/avimshah/cloudcite/blob/master/LICENSE"> <img id="image_code" src="static/favicons/android-icon-144x144.png"/></a>


</div>      
   </template>
   
<style scoped lang="scss">
  #pricing {
    text-align: center;
    color: #212121;
    font-size:50px;
    color:white;
    -webkit-animation-name: main_text; 
    -webkit-animation-duration: 3s;
    animation-name: main_text;
    animation-duration: 3s;
    animation-fill-mode: forwards;


}
#source_code {
    text-align: center;
    color: #212121;
    font-size:25px;
    padding-top:75px;
    color:white;
    -webkit-animation: fadein 5s; 
       -moz-animation: fadein 5s; 
        -ms-animation: fadein 5s; 
        animation: fadein 5s;
}
#image_code:hover { 
  filter: brightness(1000%);

}
#image_code {
    text-align: center;
    color: #212121;
    font-size:25px;
    padding-top:50px;
    opacity:5;
        filter: brightness(150%);

        -webkit-animation: fadein 5s; 
       -moz-animation: fadein 5s; 
        -ms-animation: fadein 5s; 
        animation: fadein 5s;
}
@keyframes fadein {
    0%   {opacity:0;}
    50%   {opacity:0;}
    75%   {opacity:0.5;}
    100%   {opacity:1;}
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    0%   {opacity:0;}
    50%   {opacity:0;}
    75%   {opacity:0.5;}
    100%   {opacity:1;}

}

@-webkit-keyframes fadein {
     0%   {opacity:0;}
    50%   {opacity:0;}
    75%   {opacity:0.5;}
    100%   {opacity:1;}
}

/* Internet Explorer */
@-ms-keyframes fadein {
    0%   {opacity:0;}
    50%   {opacity:0;}
    75%   {opacity:0.5;}
    100%   {opacity:1;}
}

@keyframes main_text {
   from {padding-top: 250px;}
    to {padding-top: 100px;}
   0%   {opacity:0;}
    50%   {opacity:0;}
    75%   {opacity:0.5;}
    100%   {opacity:1;}
}


  
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cite from '@/components/Cite.vue';

@Component({
  components: {
    Cite
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
  #home {
    text-align: center;
    color: #212121;
  }
  #hero {
    padding-bottom: 25px;
    height: 60%;
    background-color: #fff;
  }
</style>
