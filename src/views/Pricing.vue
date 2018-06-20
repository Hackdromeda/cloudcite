<template>

  <div class="main">
      <div id="pricing">CloudCite Will be Free Forever!</div>
      <div id= "quote">Save $119.88 annually by using CloudCite over EasyBib Pro </div>
     <div id="tier1"> <h1 id="slogan"> What You Are Getting For Free </h1> 
      <li id ="offers"> A public API endpoint </li>
      <li id ="offers"> Citations in over 1000 formats including MLA, APA, and Chicago
       </li>

     </div>
      <div id ="source_code">Check Out Our Source Code.  <br>     
      <a href="https://github.com/avimshah/cloudcite/blob/master/LICENSE"> <img id="image_code" src="static/favicons/android-icon-144x144.png"/></a>
 </div>


</div>      
   </template>
   
<style scoped lang="scss">

#offers{
  padding-top:10px;
  text-align: left;
  font-size:15px;
  color: #000;
}
#slogan{
  font-size: 25px;
  color:#000;


}
.main{
  overflow-x: scroll;
  padding-bottom:25px;


}

 #tier1{
    margin:auto;
    background-color: #fff;
    color: #000;
    opacity:2;
    border: 0.1px solid #A4A4A4;
    width:400px;
    padding-right:10px;
    padding-left:10px;
   box-shadow: 5px 5px 18px 1px #333333;
    height:200px;
    border-radius:10px;
    color: #a6c7fc;
    font-size:30px;
    margin-top:50px;
     padding-top:25px;

    color:white;
    -webkit-animation: fadein 5s; 
       -moz-animation: fadein 5s; 
        -ms-animation: fadein 5s; 
        animation: fadein 5s;

}

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
#quote{
 text-align: center;
    color: black;
    font-size:25px;
    padding-top:25px;
    color:white;
    -webkit-animation: fadein 5s; 
       -moz-animation: fadein 5s; 
        -ms-animation: fadein 5s; 
        animation: fadein 5s;

}
#source_code {
    margin:auto;
    margin-top:50px;
    background-color: #fff;
    opacity: 0.95;
    width:750px;
    padding-right:10px;
    padding-left:10px;
   box-shadow: 5px 5px 18px 1px #333333;
    height:200px;
    border-radius:10px;
    color: #000;
    font-size:30px;
     padding-top:25px;
    -webkit-animation: fadein 5s; 
       -moz-animation: fadein 5s; 
        -ms-animation: fadein 5s; 
        animation: fadein 5s;
}
#image_code:hover { 
  filter: brightness(100%);
}
#image_code {
    text-align: center;
    color: #212121;
    font-size:25px;
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
    to {padding-top: 75px;}
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
    padding-bottom: 0px;
    height: 60%;
    background-color: #fff;
  }
</style>
