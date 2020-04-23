<template lang="pug">
    v-container
      v-row
        v-col(cols="4")
          v-card(outlined).card-height.pa-4
            v-layout.flex-column
              .title Online
              Operator(
                v-for="(item, index) in onlineOperators"
                :key="index"
                :name="item.name"
                :phone="item.phone"
                :status="item.status"
              )
        v-col(cols="8")
          v-card(outlined).card-height.pa-4
            .title Offline
            v-row
              v-col(v-for="(operator, index) in operators" :key="operator.id" cols="6")
                Operator(
                  :name="operator.name"
                  :phone="operator.phone"
                  :status="operator.status"
                  :color="operator.color"
                  :lastSeen="operator.lastSeen"
                )
</template>
<script>
import Operator from '@/components/Operator.vue';

export default {
  name: 'Operators',
  data() {
    return {
      onlineOperators: [
        {
          id: 1,
          name: 'Abdukhakim',
          phone: '+998444444444',
          status: 'Online',
        },
        {
          id: 2,
          name: 'Khojiakbar',
          phone: '+998777777777',
          status: 'Online',
        },
      ],
      operators: [
        {
          id: 1,
          name: 'Abubakr',
          phone: '+998998999779',
          status: 'Offline',
          color: 'grey',
          lastSeen: '01/04/2020 13:40',
        },
        {
          id: 2,
          name: 'Abdumalik',
          phone: '+998111111111',
          status: 'Offline',
          color: 'grey',
          lastSeen: '03/04/2020 14:30',
        },
        {
          id: 3,
          name: 'Amal',
          phone: '+998333333333',
          status: 'Offline',
          color: 'grey',
          lastSeen: '04/04/2020 12:10',
        },
      ],
    };
  },
  components: {
    Operator,
  },
};
</script>
<style scoped>
  .card-height {
    height: 600px;
    overflow: hidden;
  }
</style>
