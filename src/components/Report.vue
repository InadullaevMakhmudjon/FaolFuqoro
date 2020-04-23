<template lang="pug">
    v-card(@click="$emit('click', report)").mt-2.mb-2
        v-card-text
            v-layout.flex-row
                GmapMap(
                    style="width: 100px; height: 110px;"
                    :center="{ ...report }"
                    :zoom="14"
                    :options="options"
                )
                    GmapMarker(:position="{ ...report }" :icon="`http://maps.google.com/mapfiles/ms/icons/${report.status.color}-dot.png`")
                v-layout.ml-2.flex-column
                    .caption {{ `Murojaat raqami: ${report.id}` }}
                    .caption {{ `Murojaatchi: ${report.creator.name}` }}
                    .caption {{ `Telefon: ${report.creator.phone}` }}
                    //
                      span.caption Holati
                        span(
                          :class="`${report.status.color}--text`"
                        ).caption  {{ report.status.name }}
                    .caption {{ `Sana: ${report.createdAt}` }}
                    v-btn(outlined small :color="report.status.color" @click="() => { this.$router.push({ name: 'Report', params: { id: report.id } }); }") Ko'proq
</template>
<script>
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
      },
    };
  },
};
</script>
