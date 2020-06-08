<template lang="pug">
  v-container.container.fill-height.justify-center.align-center
    v-row
      v-col(cols="4")
        v-text-field(v-model="image" outlined placeholder="Image Link")
        v-textarea(outlined placeholder="Comment text" v-model="comment")
        GmapMap(
          :options="map.options"
          :center="map.center"
          :zoom="zoom"
          style="width: 100%; height: 400px"
        )
          GmapMarker(:position="{ lat, lng }")
        v-btn(outlined large @click="submit").mt-5 Submit
      v-col(cols="4")
        img(:src="image")
</template>
<script>
import CREATEREPORT from '@/graphql/employee/CloseReport.gql';
import REPORT from '@/graphql/report.gql';

export default {
  name: 'CreateReport',
  data() {
    return {
      report: {},
      image: '',
      comment: '',
      zoom: 11,
    };
  },
  computed: {
    lat() { return this.report.lat || 0; },
    lng() { return this.report.lng || 0; },
    map() {
      return {
        center: {
          lat: this.lat,
          lng: this.lng,
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
      };
    },
  },
  methods: {
    submit() {
      if (!this.image) return;
      if (!this.comment) return;
      this.$apollo.mutate({
        mutation: CREATEREPORT,
        variables: {
          reportId: Number(this.report.id),
          closer: this.$store.state.user.id,
          toWhom: this.$store.state.user.manager.id,
          comment: this.comment,
          image: this.image,
        },
      }).then(() => { this.$router.push({ name: 'Reports' }); });
    },
  },
  mounted() {
    this.$apollo.query({
      query: REPORT,
      variables: { id: this.$route.params.id },
    }).then(({ data }) => { this.report = data.report; });
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
  }
</style>
