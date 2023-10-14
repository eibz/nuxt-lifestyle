<template>
  <div
    class="StaticThreeSixtyFrame ProductImageShowcaseB__static-360-frame"
  >
    <img
      class="StaticThreeSixtyFrame__img StaticThreeSixtyFrame__img--frame-14"
      src="https://sg360.sungod.co/insecure/crop:2100:1500/resize:fill:500/plain/gs://sg360/230406/Renegades/rgf_Mnavy_014.png"
    />
    <img
      v-if="colour"
      class="StaticThreeSixtyFrame__img StaticThreeSixtyFrame__img--frame-14"
      :src="`https://sg360.sungod.co/insecure/crop:2100:1500/resize:fill:500/plain/gs://sg360/230406/Renegades/rgle_${formatColourName(colour)}_014.png`"
    />
  </div>
</template>
<script setup>
const props = defineProps({
    colour: String,
});
</script>
<style>
.StaticThreeSixtyFrame__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
