<template lang="pug">
    v-container.ma-0.pb-0
        v-row
          v-col(cols="4").pb-0
            v-layout(align-center justify-center column)
              img(:src="image").image-custom
          v-col(cols="8").pa-2.pb-0
            v-layout(column)
              h2 {{ `Ism ${fullName}` }}
              h2 {{ `Familya ${fullName}` }}
              v-layout(align-center)
                v-icon update
                span.ml-1 {{ deadline }}
        v-row
            v-col(cols="4").pa-4.pt-0
                v-layout(justify-center align-center)
                    h4 {{ `Number ${number}` }}
            v-col(cols="8").pa-4.pt-0
              v-layout(row align-center)
                v-icon(color="light-green" medium) call
                h5.light-green--text.ml-1 {{ phone }}
</template>
<script>
import moment from 'moment';

export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  computed: {
    number() {
      return this.report.id;
    },
    image() {
      return this.report.creator.image || 'https://clubsports.gcu.edu/wp-content/uploads/Coach-Avator.png';
    },
    fullName() {
      return this.report.creator.name;
    },
    phone() {
      return this.report.creator.phone;
    },
    comments() {
      return this.report.comments.map(({ comment, createdAt, status }) => ({ comment, status: status.name, date: moment(createdAt).format('DD-MM-YYYY') }));
    },
    deadline() {
      return this.report.deadline ? moment(this.report.deadline).format('LLL') : 'Mavjud emas';
    },
    createdAt() {
      return moment(this.report.createdAt).format('DD-MM-YYYY HH:MM');
    },
  },
};
</script>
<style scoped>
.image-custom {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid grey;
    padding: 5px
}
</style>
