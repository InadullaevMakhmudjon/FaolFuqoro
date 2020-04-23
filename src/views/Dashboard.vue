<template lang="pug">
    v-container
      v-row
        v-col(style="border: 0.1px solid #C6D2D9; background: #E4EAEE; height: 100px;")
          v-layout(justify-center align-center).flex-column
            .subtitle-2.grey--text Total reports
            .display-1.mt-1 128/170
        v-col(style="border: 0.1px solid #C6D2D9; background: #E4EAEE; height: 100px;")
          v-layout(justify-center align-center).flex-column
              .subtitle-2.grey--text Total reports
              .display-1.mt-1 128/170
        v-col(style="border: 0.1px solid #C6D2D9; background: #E4EAEE; height: 100px;")
          v-layout(justify-center align-center).flex-column
            .subtitle-2.grey--text Total reports
            .display-1.mt-1 128/170
      v-row(style="border: 0.1px solid #C6D2D9; height: 450px;")
</template>
<script>
export default {
  name: 'Dashboard',
};
</script>
<style scoped>
  .display-1 {
    color: #666666;
  }
</style>
