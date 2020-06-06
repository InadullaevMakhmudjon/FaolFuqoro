<template lang="pug">
    v-container.pt-0.custom-report-container
        v-dialog(v-model="open" width="500")
          v-card
            v-container.pa-5
              v-select(
                v-model="selected"
                item-text="name"
                item-value="id"
                :items="selectItems.items"
                :label="selectItems.title"
              )
              date-picker(v-if="condition" @date="date = $event" v-model="openDate")
              v-textarea(solo label="Izoh" v-model="commentText")
              v-btn(outlined @click="delegate") Topshirish
        v-row
          v-col(cols="12").py-2
            report-header
          v-col(cols="12").py-0
            v-divider
          v-col(cols="12").py-0
            person-info(:report="report")
          v-col(cols="12").py-0
            report-info(:report="report")
          v-col(cols="12").py-0
            v-divider
          v-col(cols="12").py-0
            report-comments(:report="report")
          v-col(cols="12").py-0
            report-actions(:reject="reject" :finish="finish" :status="report.status" :delegate="() => { open = true }")

</template>
<script>
import REJECTREPORT from '@/graphql/government/reject_report.gql';
import DELEGATETOORG from '@/graphql/DelegateToOrg.gql';
import DELEGATETOEMPLOYEE from '@/graphql/DelegateToEmployee.gql';
import DatePicker from '@/components/DatePicker.vue';
import ORGS from '@/graphql/organizations.gql';
import EMPLOYEES from '@/graphql/employees.gql';
import FINISHREPORT from '@/graphql/FinishReport.gql';
import Info from './PersonInfo.vue';
import RerportInfo from './ReportInfo.vue';
import Header from './Header.vue';
import Comments from './Comments.vue';
import Actions from './Actions.vue';

export default {
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      openDate: false,
      commentText: '',
      selected: null,
      date: '',
      organizations: [],
      employees: [],
    };
  },
  components: {
    'person-info': Info,
    'report-info': RerportInfo,
    'report-header': Header,
    'report-comments': Comments,
    'report-actions': Actions,
    'date-picker': DatePicker,
  },
  computed: {
    condition() {
      return ['1', '2'].includes(this.$getRole());
    },
    reportComment() {
      const item = this.report.comments.find(({ status: { id } }) => id == '1');
      return item ? item.comment : '';
    },
    selectItems() {
      if (['1', '2'].includes(this.$getRole())) {
        return {
          items: this.organizations,
          title: 'Tashkilot tanlang',
        };
      }
      return {
        items: this.employees,
        title: 'Xodim tanlang',
      };
    },
  },
  methods: {
    reject() {
      this.$apollo.mutate({
        mutation: REJECTREPORT,
        variables: { id: this.report.id },
      }).then(() => {
        this.$router.push({ name: 'Reports', params: { reload: true } });
      });
    },
    delegate() {
      const generic = { comment: this.commentText, to: this.selected, id: this.report.id };
      this.$apollo.mutate({
        mutation: this.condition ? DELEGATETOORG : DELEGATETOEMPLOYEE,
        variables: this.condition ? { ...generic, date: this.date } : generic,
      }).then(() => {
        this.$router.push({ name: 'Reports', params: { reload: true } });
      });
    },
    finish() {
      this.$apollo.mutate({
        mutation: FINISHREPORT,
        variables: { id: this.report.id },
      }).then(() => {
        this.$router.push({ name: 'Reports', params: { reload: true } });
      });
    },
  },
  mounted() {
    Promise.all([
      this.$apollo.query({
        query: ORGS,
      }),
      this.$apollo.query({
        query: EMPLOYEES,
        variables: { id: this.$store.state.user.id },
      }),
    ])
      .then(([org, em]) => {
        this.organizations = org.data.users;
        this.employees = em.data.users;
      });
  },
};
</script>
