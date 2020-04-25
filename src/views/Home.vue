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
          v-list-item(
            link
            justify-center
            @click="itemClick(item.path)"
            :class="$route.name === item.path ? 'home-button' : ''"
          )
            v-list-item-icon
              v-icon {{ item.icon }}
            v-list-item-content {{ item.name }}
        template(v-slot:append)
          .pa-2
            v-btn(outlined large block color="grey" @click="logout") Chiqish
      v-app-bar(app clipped-left)
        v-spacer
        v-toolbar-title {{ title }}
        v-spacer
      v-content
        v-container(fluid)
          router-view
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Statistika',
          icon: 'dashboard',
          path: 'Dashboard',
          v: true,
        },
        {
          id: 2,
          name: 'Hisobotlar',
          icon: 'report',
          path: 'Reports',
          v: true,
        },
        {
          id: 3,
          name: 'Foydalanuvchilar',
          icon: 'people_alt',
          path: 'Operators',
          v: this.role,
        },
        {
          id: 4,
          name: 'Sozlamar',
          path: 'Settings',
          icon: 'settings',
          v: true,
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({ name: 'Login' }));
    },
    itemClick(path) {
      if (this.$route.name !== path) {
        this.$router.push({ name: path });
      }
    },
  },
  computed: {
    title() {
      return this.$store.state.user.name;
    },
  },
};
</script>
