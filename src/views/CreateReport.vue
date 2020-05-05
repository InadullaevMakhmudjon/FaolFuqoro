<template lang="pug">
  v-container.container.fill-height.justify-center.align-center
    v-row
      v-col(cols="4")
        v-text-field(v-model="image" outlined placeholder="Image Link")
        v-textarea(outlined placeholder="Comment text" v-model="comment")
        v-select(v-model="type" :items="types" dense label="types" item-text="name" item-value="id")
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
import REPORTTYPES from '@/graphql/ReportTypes.gql';

export default {
  name: 'CreateReport',
  data() {
    return {
      image: '',
      comment: '',
      lat: 41.311081,
      lng: 69.240562,
      zoom: 11,
      types: [],
      type: null,
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
  apollo: {
    types: {
      query: REPORTTYPES,
      update: (data) => data.reportTypes,
    },
  },
  watch: {
    type(value) {
      console.log(value);
    },
  },
  methods: {
    clicked(value) {
      this.lat = value.latLng.lat();
      this.lng = value.latLng.lng();
    },
    submit() {
      if (!this.image) return;
      if (!this.comment) return;
      if (!this.type) return;
      if (!this.date) return;
      this.$apollo.mutate({
        mutation: CREATEREPORT,
        variables: {
          image: this.image,
          lat: this.lat,
          lng: this.lng,
          comment: this.comment,
          type: this.type,
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
