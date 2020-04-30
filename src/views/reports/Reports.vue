<template lang="pug">
  v-container
    v-layout.my-3
      template(v-for="(btn, i) in buttons")
        v-btn(
          :key="i"
          v-if="btn.show"
          :color="(index === btn.id) ? btn.color: 'grey'"
          outlined
          small
          @click="index = i"
        ).mx-2 {{ btn.name }}
    GenericComponent(
      :type="index"
      @action="index = $event"
    )
</template>
<script>
import GenericComponent from './GenericReports.vue';

export default {
  name: 'Reports',
  props: {
    reload: {
      required: false,
      type: Boolean,
    },
  },
  data() {
    return {
      index: 0,
      buttons: [
        {
          id: 0,
          name: 'Hisobotlar',
          path: '/reports',
          color: 'black',
          show: true,
        },
        {
          id: 1,
          name: 'Yangi Murojaatlar',
          path: '/newreports',
          color: 'blue',
          show: true,
        },
        {
          id: 2,
          name: 'Jarayonda Murojaatlar',
          path: '/newreports',
          color: 'orange',
          show: !this.$isEmployee(),
        },
        {
          id: 3,
          name: 'Yopilgan Murojaatlar',
          path: '/newreports',
          color: 'green',
          show: true,
        },
      ],
    };
  },
  updated() {
    if (this.reload) {
      window.location.reload();
    }
  },
  mounted() {
    if (this.reload) {
      window.location.reload();
    }
  },
  components: {
    GenericComponent,
  },
};
</script>
