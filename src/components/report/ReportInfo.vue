<template lang="pug">
    v-container.pa-0.ma-0
        v-row
            v-col(cols="12")
              v-layout(align-center)
                h4.green--text Rasm
                v-icon(color="green").ml-1 image
            v-col(cols="12").py-0
              div(:style="`background-image: url('${image}')`").custom-container
            v-col(cols="11")
                    v-icon(medium color="green").ma-1 chat
                    span {{ comment }}
</template>
<script>
export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      return this.report.image;
    },
    status() {
      switch (this.$getRole()) {
        case '1': return 1;
        case '2': return 1;
        case '3': return 2;
        case '4': return 3;
        default: return 0;
      }
    },
    comment() {
      const comment = this.report.comments.find(({ status: { id } }) => id == this.status);
      return comment ? comment.comment : '';
    },
  },
};
</script>
