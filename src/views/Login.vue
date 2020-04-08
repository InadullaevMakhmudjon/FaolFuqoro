<template lang="pug">
    v-container(fill-height fluid)
      v-layout(justify-center align-center).flex-column
          v-card(flat).mb-2
            v-layout(flex-row align-center)
              v-icon(large).mr-3 work
              .display-1 Workspace
          v-card(width="350").pa-5
            v-flex.pa-5
              v-layout.flex-column
                .subtitle-1.mb-5.text-sm-center Log in to your portal
                v-text-field(
                  label="Email"
                  v-model="email"
                  prepend-icon="email"
                  @keyup.enter="login"
                )
                v-text-field(
                  label="Password"
                  v-model="password"
                  prepend-icon="lock"
                  type="password"
                  @keyup.enter="login"
                )
                v-btn(outlined @click="login" color="primary").mt-5 Login
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.email === 'admin' && this.password === 'admin') {
        this.$router.push({ name: 'Home', params: { role: 1 } });
      } else if (this.email === 'operator' && this.password === 'operator') {
        this.$router.push({ name: 'Home', params: { role: 0 } });
      }
    },
  },
};
</script>
<style scoped>
.customized {
  display: flex;
  flex-direction: row;
}
</style>
