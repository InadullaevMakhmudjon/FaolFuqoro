<template lang="pug">
    v-container
      v-layout(v-if="$route.name == 'Settings'" )
          v-card(v-for="(item, index) in items" :key="index" v-if="item.v" @click="$router.push(item.path)").ma-2.pl-5.pr-5
            v-card-text
                v-layout.flex-row.align-center
                    v-icon {{ item.icon }}
                    v-layout.ml-5.flex-column
                        .caption {{ item.name }}
                        .caption {{ item.caption }}
      router-view
</template>
<script>
import COUNTS from '@/graphql/settings/Counts.gql';
import EMPLOYEE_COUNTS from '@/graphql/settings/EmployeesCount.gql';

export default {
  name: 'Settings',
  data() {
    return {
      countEmp: 0,
    };
  },
  computed: {
    items() {
      return [
        {
          name: 'Organizations',
          caption: `Total: ${this.organizationsCount}`,
          icon: 'domain',
          path: { name: 'Organizations' },
          v: ['1', '2'].includes(this.$store.state.user.role.id),
        },
        {
          name: 'Operators',
          caption: `Total: ${this.operatorsCount}`,
          icon: 'people_alt',
          path: { name: 'Operators', params: { orgId: this.$store.state.user.id } },
          v: ['1', '2'].includes(this.$store.state.user.role.id),
        },
        {
          name: 'Employees',
          caption: `Total: ${this.countEmp}`,
          icon: 'people_alt',
          path: { name: 'Operators', params: { orgId: this.$store.state.user.id } },
          v: this.$store.state.user.role.id == '3',
        },
      ];
    },
  },
  methods: {
    employees() {
      this.$apollo.query({
        query: EMPLOYEE_COUNTS,
        variables: {
          id: this.$store.state.user.id,
        },
      }).then(({ data }) => { this.countEmp = data.usersConnection.aggregate.count; });
    },
  },
  apollo: {
    operatorsCount: {
      query: COUNTS,
      update: (data) => data.operators.aggregate.count,
    },
    organizationsCount: {
      query: COUNTS,
      update: (data) => data.organizations.aggregate.count,
    },
  },
  updated() {
    this.employees();
    this.$apollo.queries.operatorsCount.refetch();
    this.$apollo.queries.organizationsCount.refetch();
  },
  mounted() {
    this.employees();
  },
};
</script>
