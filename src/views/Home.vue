<template lang="pug">
    div
      v-navigation-drawer(
        light
        permanent
        app
        clipped
      )
        v-divider
        v-list(
          v-for="item in items"
          :key="item.id"
          v-if="item.v"
        ).pa-0
          v-list-item(link justify-center)
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-content {{ item.name }}
        template(v-slot:append)
          .pa-2
            v-btn(outlined large block color="grey" @click="logout") Logout
      v-app-bar(app clipped-left)
        v-spacer
        v-toolbar-title Name of the government
        v-spacer
      v-content
        v-container(fluid)

</template>

<script>
export default {
  name: 'Home',
  props: {
    role: {
      type: Number,
    },
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Dashboard',
          icon: 'dashboard',
          v: true,
        },
        {
          id: 2,
          name: 'Reports',
          icon: 'report',
          v: true,
        },
        {
          id: 3,
          name: 'Users',
          icon: 'people_alt',
          v: this.role,
        },
        {
          id: 4,
          name: 'Settings',
          icon: 'settings',
          v: true,
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$router.push({ name: 'Login' });
    },
  },
  mounted() {
    if (typeof this.role !== 'number') this.logout();
  },
};
</script>
