<template>
  <div>
    <img
      src="https://sg360.sungod.co/insecure/crop:2100:1500/resize:fill:500/plain/gs://sg360/230406/Renegades/rgf_Mnavy_014.png"
    />
    <img
      v-if="colour"
      :src="`https://sg360.sungod.co/insecure/crop:2100:1500/resize:fill:500/plain/gs://sg360/230406/Renegades/rgle_${formatColourName(colour)}_014.png`"
    />
  </div>
</template>
<script setup>
const props = defineProps({
    colour: String,
});
</script>
<style scoped>
img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
