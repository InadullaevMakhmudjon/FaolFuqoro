<template lang="pug">
    v-container
        v-layout.flex-row.justify-space-between
            v-btn(outlined @click="$router.push({ name: 'Settings' })") Back
            .display-1 {{ $store.state.user.id == '1' ? 'Operators' : 'Employees' }}
            v-btn(outlined color="green" @click="createUser") Create
        v-row.mt-5
            v-col
                v-data-table(
                    :headers="headers"
                    :items="users"
                )
                    template(v-slot:body="{ items }")
                        tr(v-for="(item, index) in items" :key="index")
                            td
                                img(:src="item.image" alt="Organizations").settings-operator
                            td {{ item.name }}
                            td {{ item.username }}
                            td {{ item.phone }}
                            td
                              v-btn(icon @click="edit(item)").mx-2
                                v-icon edit
                              v-btn(icon color="red" @click="deleteUser(item.id)").mx-2
                                v-icon delete
        v-dialog(
          v-model="dialog"
          width="500"
        )
          v-card
            v-card-title(primary-title).justify-center
              img(:src="operator.image" alt="Operators").ma-2.image-bordered
              v-text-field(label="Name" @keyup.enter="save" v-model="operator.name").ma-2
              v-text-field(label="Username" @keyup.enter="save" v-model="operator.username").ma-2
              v-text-field(label="Phone" @keyup.enter="save" v-model="operator.phone").ma-2
              v-text-field(label="New password" @keyup.enter="save" type="password" v-model="operator.password").ma-2
              v-text-field(label="Repeat new password" @keyup.enter="save" type="password" :disabled="!operator.password" v-model="operator.repead").ma-2
              v-btn(outlined block @click="save").ma-2 Save
</template>
<script>
import OPERATORS from '@/graphql/settings/Operators.gql';
import UPDATEUSER from '@/graphql/settings/UpdateUser.gql';
import UPDATEUSERPWD from '@/graphql/settings/UpdateUserPwd.gql';
import CREATEUSER from '@/graphql/settings/CreateUser.gql';
import DELETEUSER from '@/graphql/settings/DeleteUser.gql';

export default {
  name: 'Operators',
  data() {
    return {
      dialog: false,
      operator: {
        create: false,
        image: '',
        name: '',
        username: '',
        phone: '',
        password: '',
        repead: '',
      },
      users: [],
      headers: [
        { text: 'Image', value: 'image' },
        { text: 'Name', value: 'name' },
        { text: 'Username', value: 'username' },
        { text: 'Phone', value: 'phone' },
        { text: '' },
      ],
    };
  },
  computed: {
    isEqual() {
      return this.operator.password === this.operator.repead;
    },
  },
  methods: {
    edit(item) {
      this.operator = { ...item, password: '', repead: '' };
      this.dialog = true;
    },
    save() {
      const userId = this.$store.state.user.id;
      const common = () => { window.location.reload(); };
      if (Object.keys(this.operator).length) {
        if (this.operator.create) {
          if (this.operator.password && this.isEqual) {
            this.$apollo.mutate({
              mutation: CREATEUSER,
              variables: { ...this.operator, roleId: userId == '1' ? 2 : 4, managerId: userId },
            }).then(common);
          }
        } else if (this.operator.password && this.isEqual) {
          this.$apollo.mutate({
            mutation: UPDATEUSERPWD,
            variables: { ...this.operator },
          }).then(common);
        } else if (this.operator.password) {
          alert('Password incorrect');
        } else {
          // alert('without Password');
          this.$apollo.mutate({
            mutation: UPDATEUSER,
            variables: { ...this.operator },
          }).then(common);
        }
      }
    },
    createUser() {
      this.operator = {
        create: true,
        image: this.$store.state.user.id == '1'
          ? 'https://cdn.iconscout.com/icon/free/png-512/operator-1411794-1194283.png'
          : 'https://png.pngtree.com/png-vector/20190228/ourlarge/pngtree-vector-engineer-icon-png-image_711642.jpg',
      };
      this.create = true;
      this.dialog = true;
    },
    deleteUser(id) {
      this.$apollo.mutate({
        mutation: DELETEUSER,
        variables: { id },
      }).then(() => { window.location.reload(); });
    },
    refetch() {
      this.$apollo.query({
        query: OPERATORS,
        variables: {
          id: this.$store.state.user.id,
          roleId: this.$store.state.user.id == '1' ? 2 : 4,
        },
      }).then(({ data }) => { this.users = data.users; });
    },
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.operator = {};
      }
    },
  },
  mounted() {
    this.refetch();
  },
};
</script>
<style scoped>
  .card-height {
    height: 600px;
    overflow: hidden;
  }
</style>
