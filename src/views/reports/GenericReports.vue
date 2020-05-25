<template lang="pug">
  v-container
    GmapMap(
      :options="map.options"
      :center="report ? { lat: report.lat, lng: report.lng } : map.center"
      :zoom="report ? 15 : 11"
      style="width: 100%; height: 500px"
    )
      template(v-for="(item, index) in reports")
        GmapMarker(
          :key="index"
          @click="toggleInfoWindow(item)"
          :icon="`http://maps.google.com/mapfiles/ms/icons/${item.status.color}-dot.png`"
          :position="{ lat: item.lat, lng: item.lng }"
        )
      GmapInfoWindow(
        :options="infoWindow.options"
        :position="infoWindow.position"
        :opened="infoWindow.open"
        @closeclick="infoWindow.open = false"
      )
        .map-item
          img(:src="infoWindow.content.image" alt="hello").map-item-image
          .map-item-container
            .caption {{ `Murojaat raqami: ${infoWindow.content.id}` }}
            .caption {{ `Murojaatchi: ${infoWindow.content.name}` }}
            .caption {{ `Telefon raqami: ${infoWindow.content.phone}` }}
            .caption {{ `Sana: ${$format(infoWindow.content.createdAt)("DD/MM/YYYY HH:mm")}` }}
            v-btn(outlined small @click="infoWindow.content.onClick").mt-2 Ko'proq
    v-container
      v-row
        v-col(v-if="type === 0" v-for="(card, i) in cards" :key="i" cols="4").text-center
          .title {{ card.title }}
          Report(
            v-for="(item, index) in card.items.slice(0, 3)"
            :key="index"
            :report="item"
            @click="report = $event"
          )
          v-divider
          v-btn(
            text
            :class="`${card.color}--text`"
            @click="clicked(i)"
          ).overline.pointer.mt-2 Barchasini ko'rish
        v-col(v-if="type !== 0" v-for="(item, i) in reports" :key="i" cols="4")
          Report(
            :report="item"
            @click="report = $event"
          )
</template>
<script>


import Report from '@/components/Report.vue';
import Organization from '@/components/Organization.vue';
import Operator from '@/components/Operator.vue';
import GOVERNMENT_NEW_REPORTS from '@/graphql/government/new_reports.gql';
import GOVERNMENT_PENDING_REPORTS from '@/graphql/government/pending_reports.gql';
import ORG_NEW_REPORTS from '@/graphql/organization/new_reports.gql';
import ORG_PENDING_REPORTS from '@/graphql/organization/pending_reports.gql';
import EMPLOYEE_NEW_REPORTS from '@/graphql/employee/new_reports.gql';
import CLOSED_REPORTS from '@/graphql/closed_reports.gql';

import GOVERNMENT_NEW_REPORTS_S from '@/graphql/government/new_subscription.gql';
import GOVERNMENT_PENDING_REPORTS_S from '@/graphql/government/pending_subscription.gql';

import ORG_NEW_REPORTS_S from '@/graphql/organization/new_subscription.gql';
import ORG_PENDING_REPORTS_S from '@/graphql/organization/pending_subscription.gql';

import EMPLOYEE_NEW_REPORTS_S from '@/graphql/employee/new_subscription.gql';

import CLOSED_REPORTS_S from '@/graphql/cosed_subscription.gql';

export default {
  name: 'GenericReports',
  props: {
    type: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      role: 1,
      report: null,
      infoWindow: {
        index: null,
        open: false,
        position: {
          lat: 41.311081,
          lng: 69.240562,
        },
        options: {
          pixelOffset: {
            width: 0,
            height: -35,
          },
        },
        content: {
          id: '',
          image: '',
          name: '',
          phone: '',
          createdAt: '',
          onClick: () => {},
        },
      },
      map: {
        center: {
          lat: 41.311081,
          lng: 69.240562,
        },
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUI: false,
        },
      },
      newReports: [],
      closedReports: [],
      pendingReports: [],
    };
  },
  components: {
    Report,
    Organization,
    Operator,
  },
  methods: {
    getAll() {
      const task = {
        tasks: [],
        callBack: ([news, pending, closed]) => {
          this.newReports = news.data.reports.map((report) => ({ ...report, status: { color: 'blue', name: 'Yangi' } }));
          this.closedReports = closed.data.reports.map((report) => ({ ...report, status: { color: 'green', name: 'Yopilgan' } }));
          this.pendingReports = pending.data.reports.map((report) => ({ ...report, status: { color: 'orange', name: 'Jarayonda...' } }));
        },
      };
      const government = [
        this.$apollo.query({
          query: GOVERNMENT_NEW_REPORTS,
        }),
        this.$apollo.query({
          query: GOVERNMENT_PENDING_REPORTS,
        }),
      ];
      const organization = [
        this.$apollo.query({
          query: ORG_NEW_REPORTS,
          variables: { id: this.$store.state.user.id },
        }),
        this.$apollo.query({
          query: ORG_PENDING_REPORTS,
        }),
      ];
      const employee = [
        this.$apollo.query({
          query: EMPLOYEE_NEW_REPORTS,
          variables: { id: this.$store.state.user.id },
        }),
      ];
      if (['1', '2'].includes(this.$getRole())) {
        task.tasks = government;
      } else if (this.$getRole() == '3') {
        task.tasks = organization;
      } else if (this.$getRole() == '4') {
        task.tasks = employee;
        task.callBack = ([news, closed]) => {
          this.newReports = news.data.reports.map((report) => ({ ...report, status: { color: 'blue', name: 'New' } }));
          this.closedReports = closed.data.reports.map((report) => ({ ...report, status: { color: 'green', name: 'Closed' } }));
        };
      }
      const id = ['1', '2'].includes(this.$store.state.user.role.id) ? 1 : this.$store.state.user.id;
      Promise.all(task.tasks.concat([
        this.$apollo.query({
          query: CLOSED_REPORTS,
          variables: { id },
        }),
      ])).then(task.callBack);
    },
    clicked(index) {
      if (index === 1 && this.$isEmployee()) {
      // eslint-disable-next-line no-param-reassign
        index += 1;
      }
      this.$emit('action', index + 1);
    },
    toggleInfoWindow({
      id, lat, lng, image, createdAt, creator: { name, phone },
    }) {
      this.infoWindow.position = { lat, lng };
      this.infoWindow.content = {
        id,
        image,
        createdAt,
        name,
        phone,
        onClick: () => { this.$router.push({ name: 'Report', params: { id } }); },
      };
      // Check, whether the same marker clicked as previous
      if (this.infoWindow.index === id) {
        this.infoWindow.open = !this.infoWindow.open;
      } else {
        this.infoWindow.open = true;
        this.infoWindow.index = id;
      }
    },
  },
  computed: {
    document() {
      switch (this.$getRole()) {
        case '1': return {
          NEWS: GOVERNMENT_NEW_REPORTS_S,
          PENDING: GOVERNMENT_PENDING_REPORTS_S,
          CLOSED: CLOSED_REPORTS_S,
        };
        case '2': return {
          NEWS: GOVERNMENT_NEW_REPORTS_S,
          PENDING: GOVERNMENT_PENDING_REPORTS_S,
          CLOSED: CLOSED_REPORTS_S,
        };
        case '3': return {
          NEWS: ORG_NEW_REPORTS_S,
          PENDING: ORG_PENDING_REPORTS_S,
          CLOSED: CLOSED_REPORTS_S,
        };
        case '4': return {
          NEWS: EMPLOYEE_NEW_REPORTS_S,
          CLOSED: CLOSED_REPORTS_S,
        };
        default: return {};
      }
    },
    reports() {
      switch (this.type) {
        case 1:
          return this.newReports;
        case 2:
          return this.pendingReports;
        case 3:
          return this.closedReports;
        default:
          return []
            .concat(this.newReports)
            .concat(this.$isEmployee() ? [] : this.pendingReports)
            .concat(this.closedReports);
      }
    },
    cards() {
      const news = { title: 'Yangi Murojaatlar', items: this.newReports, color: 'blue' };
      const pending = { title: 'Jarayonda Murojaatlar', items: this.pendingReports, color: 'orange' };
      const closed = { title: 'Yopilgan Murojaatlar', items: this.closedReports, color: 'green' };
      return this.$isEmployee() ? [news, closed] : [news, pending, closed];
    },
  },
  watch: {
    type() {
      this.report = null;
      this.infoWindow.open = false;
    },
    report() {
      this.infoWindow.open = false;
    },
  },
  created() {
    this.getAll();
  },
};
</script>
