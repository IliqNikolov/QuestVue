<template>
  <div>
    <Loggedout v-if="!isLogged">
      
    </Loggedout>
    <Quest v-else :usernameAndLogout="usernameAndLogout">  
    </Quest>
  </div>
</template>

<script>
import Quest from "../quest/quest"
import Loggedout from "../home/logedoutHome"
export default {
  name: 'Home',
  props:{usernameAndLogout:{}},  
  components:{Quest,Loggedout},
  data:function(){
    return{
      isLogged:false
    }
  },
   mounted:function(){
    if (localStorage.user) {
      this.isLogged=true;
    }
    else{
      this.isLogged=false;
    }
  }
}
</script>
