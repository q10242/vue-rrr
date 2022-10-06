<template>
  <div class="grid min-h-screen">
    <div class="card  bg-neutral text-neutral-content  w-10/12 place-self-center h-fit">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-6xl">Rick Roll ReURL</h2>
        <p class="grow-0">This is a simple reurl service.</p>
        <p class="grow-0">Warning: the shorter url might redirect you to the 
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> Rick Roll </a> 
            Youtube video.</p>
        <div class="grid p-3 grid-rows-3 w-full gap-3 justify-items-center ">

          <div class="inline-flex w-full justify-self-start">

            <p class="grow-0 text-2xl self-center pr-2">Origin Url:</p>
            <input type="text" placeholder="url here..." class="input input-bordered grow" v-model="origin_url" />
          </div>
          <div class="inline-flex w-full justify-self-start">
            <p class="grow-0 text-2xl self-center pr-2">Probability:</p>
            <input type="range" min="0" max="99"  v-model="probability" class="range  self-center range-error grow" /> 
            <p class="grow-0 text-2xl self-center pl-2 inline-flex w-1/12 " > <span class="justify-self-end">{{probability}}%</span> </p>
            
          </div>
          <label class="btn modal-button btn-primary w-1/2" v-on:click="reurl">Generate</label>
          
        </div>
      </div>
    </div>

      <input type="checkbox" id="result-modal" class="modal-toggle" v-model="dialog_show" />
      <div class="modal">
        <div class="modal-box grid  place-content-center">

          <h3 class="font-bold text-lg">Your RRR Url</h3>
          <div class="inline-flex  grid-cols-2 place-content-between">

            <p class="py-4 justify-self-start"><a id="ResultUrl" href="{{base_url}}/{{result.ShortUrl}}">{{base_url}}/{{result.ShortUrl}}</a></p>
            <label  v-on:click="copyClick" class="btn justify-self-end">Copy</label>
          </div>
          <qrcode-vue class="justify-self-center" :value="short_url" :size="size" :margin="margin"></qrcode-vue>
          <div class="p-2 font-bold text-lg">QR code Configs</div>
          <div class="p-2">size :{{size}}</div>
          <input type="range" min="0" max="500"  v-model="size" class="range  self-center range-error grow" /> 
          <div class="p-2">margin : {{margin}}</div>
          <input type="range" min="1" max=33  v-model="margin" class="range  self-center range-error grow" /> 
          <div class="modal-action">
            <label for="result-modal" class="btn">Close</label>
          </div>
        </div>
      </div>
  </div>
  
  
</template>

<script>
import QrcodeVue from "qrcode.vue";
import axios from 'axios'
import { integer } from "css-tree/lib/lexer/generic";
export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      dialog_show : false,
      probability: 0,
      origin_url: "",
      base_url:window.location.origin,
      result: {

      },
      short_url: "",
      size: 200,
      margin: 1
      
    }
  },
  methods :{
    reurl: function () {
      var url = "https://rrr-backend.otus.tw/redirect"
      var probability = parseInt(this.probability) 
      var payload = {
        originUrl: this.origin_url,
        probability: probability
      }
      console.log(payload)
      axios.post(url,payload).then((res)=> {
        if (res.data.ID != undefined) {
            this.result = res.data
            console.log(res.data)
            this.short_url = this.base_url+ "/" + this.result.ShortUrl
            this.dialog_show = true
        } else {
          console.log(res.data.message)
        }
      })
    },
    copyClick: function (){
      
      
      var text = this.base_url+"/"+this.result.ShortUrl;
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
      

    }
  }
}
</script>