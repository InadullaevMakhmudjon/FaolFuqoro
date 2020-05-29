<template lang="pug">
 v-container(v-if="report")
     GmapMap(
        :center="{ lat: report.lat, lng: report.lng+0.02 }"
        :zoom="14"
        :options="options"
     ).new-map
          GmapMarker(:position="{ ...report }" :icon="`http://maps.google.com/mapfiles/ms/icons/${status.color}-dot.png`")
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
          DatePicker(v-if="condition" @date="date = $event" v-model="openDate")
          v-textarea(solo label="Izoh" v-model="commentText")
          v-btn(outlined @click="delegate") Topshirish
     v-btn(
       v-for="(button, i) in buttons"
       v-if="button.show"
       :key="i"
       @click="button.callBack"
       :color="button.color"
      ).white--text.ma-2 {{ button.name }}
     v-row
        v-col(cols="4" ).paper-background
          div(style="background: white; overflow: hidden; border-radius: 5px")
            div(:style="`background-image: url('${report.image}')`").custom-container
            div(style="padding: 8px")
              v-row
                v-col(cols="4")
                  div(style="display: flex; align-items: center; justify-content: center; height: 100%")
                    img(style="width: 100px; height: 100px" :src="reportDetails.creatorImage")
                v-col(cols="8")
                  div(style="display: flex; flex-direction: column")
                    span {{ `Nomer: ${reportDetails.number}` }}
                    span {{ `Kimdan: ${reportDetails.creatorName}` }}
                    span {{ `Telifon: ${reportDetails.creatorPhone}` }}
                    span {{ `Vaqti: ${reportDetails.reportDate}` }}
                    span {{ `Gacha: ${reportDetails.reportDeadline}` }}
          v-row.pa-2
            div(
              v-for="(item, index) in reportDetails.comments"
              :style="`background: ${index === 0 ? 'lightgreen' : 'lightblue'}`"
            ).custom-comment
              h4.text-center {{ `${item.status} - ${item.date}` }}
              span {{ item.comment }}

</template>
<script>
import REPORT from '@/graphql/report.gql';
import REJECTREPORT from '@/graphql/government/reject_report.gql';
import ORGS from '@/graphql/organizations.gql';
import EMPLOYEES from '@/graphql/employees.gql';
import DELEGATETOORG from '@/graphql/DelegateToOrg.gql';
import DELEGATETOEMPLOYEE from '@/graphql/DelegateToEmployee.gql';
import FINISHREPORT from '@/graphql/FinishReport.gql';
import * as types from '@/utils/status';
import DatePicker from '@/components/DatePicker.vue';
import moment from 'moment';

export default {
  data() {
    return {
      open: false,
      report: null,
      selected: null,
      commentText: '',
      openDate: false,
      date: '',
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false,
      },
      organizations: [],
      employees: [],
    };
  },
  computed: {
    reportDetails() {
      if (this.report) {
        console.log(this.report);
        return {
          number: this.report.id,
          reportDate: moment(this.report.createdAt).format('DD-MM-YYYY HH:MM'),
          reportDeadline: this.report.deadline ? moment(this.report.deadline).format('DD-MM-YYYY HH:MM') : '-',
          creatorImage: this.report.creator.image || 'https://clubsports.gcu.edu/wp-content/uploads/Coach-Avator.png',
          creatorPhone: this.report.creator.phone,
          creatorName: this.report.creator.name,
          comments: this.report.comments.map(({ comment, createdAt, status }) => ({ comment, status: status.name, date: moment(createdAt).format('DD-MM-YYYY') })),
        };
      }
      return {};
    },
    condition() {
      return ['1', '2'].includes(this.$getRole());
    },
    getStatus() {
      if (this.report) {
        return this.$reportStatus(this.report.status);
      }
      return -1;
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
    status() {
      switch (this.getStatus) {
        case types.NEW: return { color: 'blue', title: 'Yangi' };
        case types.PENDING: return { color: 'orange', title: 'Jarayonda...' };
        case types.CLOSED: return { color: 'green', title: 'Yopilgan' };
        default: return {};
      }
    },
    comment() {
      switch (this.$getRole()) {
        case '1': return this.report.comments[0];
        case '2': return this.report.comments[0];
        case '3': return this.report.comments[1];
        case '4': return this.report.comments[2];
        default: return '';
      }
    },
    buttons() {
      return [
        {
          name: 'Orqaga',
          show: true,
          callBack: this.back,
          color: 'blue',
        },
        {
          name: 'Rad etish',
          show: this.getStatus === types.NEW && ['1', '2'].includes(this.$getRole()),
          callBack: this.reject,
          color: 'red',
        },
        {
          name: 'Topshiriq',
          show: this.getStatus === types.NEW && !this.$isEmployee(),
          callBack: () => { this.open = true; },
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
  },
  methods: {
    back() {
      this.$router.push({ name: 'Reports', params: { reload: true } });
    },
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
  components: {
    DatePicker,
  },
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      Promise.all([
        this.$apollo.query({
          query: REPORT,
          variables: { id },
        }),
        this.$apollo.query({
          query: ORGS,
        }),
        this.$apollo.query({
          query: EMPLOYEES,
          variables: { id: this.$store.state.user.id },
        }),
      ])
        .then(([{ data }, org, em]) => {
          this.report = data.report;
          this.organizations = org.data.users;
          this.employees = em.data.users;
        });
    }
  },
};
</script>
<style scoped>
  .new-map {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    right: 0;
    z-index: 0;
  }
  .custom-comment {
    width: 100%;
    min-height: 100px;
    padding-left: 25px;
    padding-bottom: 10px;
    padding-right: 10px;
    border-bottom-left-radius: 65px;
    margin: 5px;
    text-align: center;
    background: lightblue;
    box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
                inset 0 -1px 1px rgba(255, 255, 255, 0.05),
                0 15px 15px rgba(0, 0, 0, 0.3),
                inset 0 1px 1px rgba(0, 0, 0, 0.3);
  }
  .paper-background {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
