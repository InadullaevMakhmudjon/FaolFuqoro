<template lang="pug">
    v-container.pa-0
        v-row
            v-col(cols="12")
                v-layout(align-center)
                    h4.green--text Izohlar
                    v-icon(color="green").ml-1 forum
        v-row(v-for="item in report.comments")
            v-col(cols="2")
                div.image-custom
            v-col(cols="10")
                span.caption
                    span.green--text.font-weight-bold {{ item.to.name }}
                    span.ma-1 -
                    span {{ /** Belong ORG Staff name */  }}
                    span {{ format(item.createdAt) }}
                br
                span.grey--text.body-2 {{ item.comment }}
                br
                span.caption
                    span.mr-1 Kimga:
                    span.font-weight-bold {{ `${fromOrg(item)} - ${item.to.name}` }}
                br
                span.caption
                    span.mr-1 Muddat:
                    span {{ deadline }}
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
    deadline() {
      return this.report.deadline ? moment(this.report.deadline).format('ll') : 'Mavjud emas';
    },
  },
  methods: {
    format(time) { return moment(time).format('LLL'); },
    fromOrg({ status: { id: statusId } }) {
      if ((statusId - 1) == '0') return 'User';
      const comment = this.report.comments.find(({ status: { id } }) => (statusId - 1) == id);
      return comment ? comment.to.name : '-';
    },
  },
};
</script>
<style scoped>
.image-custom {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: grey;
    padding: 5px;
}
</style>
