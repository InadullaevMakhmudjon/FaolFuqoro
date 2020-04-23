<template lang="pug">
    v-container(fill-height fluid)
      v-layout(justify-center align-center).flex-column
          v-card(flat).mb-2
            v-layout(flex-row align-center)
              v-icon(large).mr-3 work
              .display-1  Faol fuqaro
          v-card(width="350").pa-5
            v-flex.pa-5
              v-layout.flex-column
                .subtitle-1.mb-5.text-sm-center Portalga kiring
                v-text-field(
                  label="Foydalanuvchi"
                  v-model="username"
                  prepend-icon="person"
                  @keyup.enter="login"
                )
                v-text-field(
                  label="Parol"
                  v-model="password"
                  prepend-icon="lock"
                  type="password"
                  @keyup.enter="login"
                )
                v-btn(outlined @click="login" color="primary").mt-5 Kirish
</template>
<script>
import User from '@/graphql/user.gql';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const a = this.$apollo.query({
        query: User,
        variables: {
          username: this.username,
          password: this.password,
        },
      }).then(({ data }) => {
        if (data.users.length) {
          this.$store.dispatch('login', data.users[0])
            .then(() => this.$router.push('/'));
        } else {
          alert('username or password incorrect');
        }
      });
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
