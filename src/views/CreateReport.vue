<template lang="pug">
  v-container.container.fill-height.justify-center.align-center
    v-row
      v-col(cols="4")
        v-text-field(v-model="image" outlined placeholder="Image Link")
        v-textarea(outlined placeholder="Comment text"
        v-model="comment"
        )
        GmapMap(
          :options="map.options"
          :center="map.center"
          :zoom="zoom"
          @click="clicked"
          style="width: 100%; height: 400px"
        )
          GmapMarker(:position="{ lat, lng }")
        v-btn(outlined large @click="submit").mt-5 Submit
      v-col(cols="4")
        img(:src="image")
</template>
<script>
import CREATEREPORT from '@/graphql/CreateReport.gql';

export default {
  name: 'CreateReport',
  data() {
    return {
      image: '',
      comment: '',
      lat: 41.311081,
      lng: 69.240562,
      zoom: 11,
      map: {
        center: {
          lat: 41.311081,
          lng: 69.240562,
        },
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUI: false,
        },
      },
    };
  },
  methods: {
    clicked(value) {
      this.lat = value.latLng.lat();
      this.lng = value.latLng.lng();
    },
    submit() {
      if (!this.image) return;
      if (!this.comment) return;
      this.$apollo.mutate({
        mutation: CREATEREPORT,
        variables: {
          image: this.image,
          lat: this.lat,
          lng: this.lng,
          comment: this.comment,
        },
      }).then(() => { window.location.reload(); });
    },
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
  }
</style>
