<template>
<div>
    <GmapMap
  :center="mapInfo.center"
  :zoom="10"
  map-type-id="terrain"
  style="height: 300px"
  @click="clicked"
>
  <GmapMarker       
    :position="marker"
    :draggable="false"
    
  />
</GmapMap>
</div>
</template>
<script>
export default {
    name:"Map",
    data:function(){
        return{
            marker:{}
        }
    },
    props:{
        mapInfo:{}
    },
    methods:{
        clicked:function(e){
            if (!this.mapInfo.isMarkerLocked) {               
                this.marker.lng=e.latLng.lng(); 
                this.marker.lat=e.latLng.lat();
                this.$emit("changeMarker",this.marker)
            }
        }
    },
    mounted:function(){
        this.marker=this.mapInfo.position
    }
}
</script>