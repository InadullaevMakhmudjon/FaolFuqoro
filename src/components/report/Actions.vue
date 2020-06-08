<template lang="pug">
    v-container
        v-row
            v-col(v-for="item in buttons" :cols="counts" v-if="item.show" :key="item.name").pa-0
                v-btn(block outlined :color="item.color" @click="item.callBack") {{ item.name }}
</template>
<script>
import * as types from '@/utils/status';

export default {
  name: 'ReportActions',
  props: {
    status: {
      type: Object,
      required: true,
    },
    delegate: {
      type: Function,
      required: true,
    },
    reject: {
      type: Function,
      required: true,
    },
    finish: {
      type: Function,
      required: true,
    },
  },
  computed: {
    getStatus() {
      return this.$reportStatus(this.status);
    },
    buttons() {
      return [
        {
          name: 'Rad etish',
          show: this.getStatus === types.NEW && ['1', '2'].includes(this.$getRole()),
          callBack: this.reject,
          color: 'red',
        },
        {
          name: 'Topshiriq',
          show: this.getStatus === types.NEW && !this.$isEmployee(),
          callBack: this.delegate,
          color: 'green',
        },
        {
          name: 'Bajarildi',
          show: this.$isEmployee(),
          callBack: this.finish,
          color: 'green',
        },
      ];
    },
    counts() {
      const counts = this.buttons.filter(({ show }) => show).length;
      return counts == '0' ? 12 : (12 / counts);
    },
  },
};
</script>
