<template lang="pug">
    v-layout(justify-space-between)
        v-btn(icon @click="back")
            v-icon arrow_back
        v-btn(icon)
            v-icon close
</template>
<script>
export default {
  name: 'ReportHeader',
  methods: {
    back() {
      this.$router.push({ name: 'Reports', params: { reload: true } });
    },
  },
};
</script>
