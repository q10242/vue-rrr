<template>
  <p>redirecting...</p>
</template>
<script>
import axios from 'axios'
export default {
  created: function () {
    axios.get('http://localhost:9010/redirect/'+this.$route.params.id )
      .then(
        (res)=> {
          if ( res.data.ID != 0 ) {

            window.location.href = res.data.OriginUrl
          }
          this.$router.push('/')
        }

      )
  }

}
</script>