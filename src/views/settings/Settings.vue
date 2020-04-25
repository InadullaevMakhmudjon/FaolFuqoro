<template lang="pug">
    v-container
      v-layout(v-if="$route.name == 'Settings'" )
          v-card(v-for="(item, index) in items" :key="index" @click="$router.push(item.path)").ma-2.pl-5.pr-5
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

export default {
  name: 'Settings',
  computed: {
    items() {
      return [
        {
          name: 'Organizations',
          caption: `Total: ${this.organizationsCount}`,
          icon: 'domain',
          path: { name: 'Organizations' },
        },
        {
          name: 'Operators',
          caption: `Total: ${this.operatorsCount}`,
          icon: 'people_alt',
          path: { name: 'Operators' },
        },
      ];
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
    this.$apollo.queries.operatorsCount.refetch();
    this.$apollo.queries.organizationsCount.refetch();
  },
};
</script>
