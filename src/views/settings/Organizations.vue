<template lang="pug">
    v-container
        v-layout.flex-row.justify-space-between
            v-btn(outlined @click="$router.push({ name: 'Settings' })") Back
            .display-1 Organizations
            span(v-if="item")
            v-btn(outlined color="green" v-else="!item" @click="() => createUser()") Create
        v-row.mt-5
            v-col
                v-data-table(
                    :headers="headers"
                    :items="users"
                )
                    template(v-slot:body="{ items }")
                        tr(v-for="(element, index) in items" :key="index" :class="(item && (item.id === element.id)) ? 'grey lighten-3' : ''" )
                            td
                                img(:src="element.image" alt="Organizations").settings-operator
                            td {{ element.name }}
                            td {{ element.username }}
                            td {{ element.phone }}
                            td {{ element.reports ? element.reports.length : 0 }}
                            td {{ element.employees ? element.employees.length : 0 }}
                            td
                              v-btn(icon @click="itemClicked(element)").mx-2
                                v-icon people_alt
                              transition(name="slide-fade-btn")
                                span(v-if="!item")
                                  v-btn(icon @click="edit(element)").mx-2
                                    v-icon edit
                                  v-btn(icon color="red" @click="deleteUser(element.id)").mx-2
                                    v-icon delete
        transition(name="slide-fade")
            v-row(v-if="item").justify-center
              v-col(cols="10")
                v-card(style="height: 100%")
                  Organization(
                    :users="item && item.users"
                    :title="item && item.name"
                    :id="item.id"
                    @click="createUser($event)"
                    @deleted="deleteUser($event)"
                  )
        v-dialog(
          v-model="dialog"
          width="500"
        )
          v-card
            v-card-title(primary-title).justify-center
              img(:src="org.image" alt="Organization").ma-2.image-bordered
              v-text-field(label="Name" @keyup.enter="save" v-model="org.name").ma-2
              v-text-field(label="Username" @keyup.enter="save" v-model="org.username").ma-2
              v-text-field(label="Phone" @keyup.enter="save" v-model="org.phone").ma-2
              v-text-field(label="New password" @keyup.enter="save" type="password" v-model="org.password").ma-2
              v-text-field(label="Repeat new password" @keyup.enter="save" type="password" :disabled="!org.password" v-model="org.repead").ma-2
              v-btn(outlined block @click="save" :loading="saveLoading").ma-2 Save
</template>
<script>
import CREATEUSER from '@/graphql/settings/CreateUser.gql';
import DELETEUSER from '@/graphql/settings/DeleteUser.gql';
import UPDATEUSER from '@/graphql/settings/UpdateUser.gql';
import UPDATEUSERPWD from '@/graphql/settings/UpdateUserPwd.gql';
import EMPLOYEES from '@/graphql/settings/Employees.gql';
import Organization from '../../components/Organization.vue';
import ORGONIZATIONS from '../../graphql/settings/Organizations.gql';

export default {
  name: 'Organizations',
  data() {
    return {
      item: null,
      saveLoading: false,
      dialog: false,
      org: {
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
        { text: 'Reports', value: 'reports' },
        { text: 'Employees', value: 'employees' },
        { text: '' },
      ],
    };
  },
  apollo: {
    users: ORGONIZATIONS,
  },
  computed: {
    isEqual() {
      return this.org.password === this.org.repead;
    },
  },
  methods: {
    fetchEmployees(id) {
      this.$apollo.query({
        query: EMPLOYEES,
        variables: {
          id,
        },
      }).then(({ data }) => {
        this.item = { ...this.item, ...data };
      });
    },
    itemClicked(item) {
      if (this.item && (this.item.id === item.id)) {
        this.item = null;
      } else {
        this.item = { ...item };
        this.fetchEmployees(item.id);
      }
    },
    edit(item) {
      this.org = { ...item, password: '', repead: '' };
      this.dialog = true;
    },
    async save() {
      this.saveLoading = true;
      if (Object.keys(this.org).length) {
        if (this.org.create || this.org.orgId) {
          if (this.org.password && this.isEqual) {
            await this.$apollo.mutate({
              mutation: CREATEUSER,
              variables: { ...this.org, roleId: this.org.orgId ? 4 : 3, managerId: this.org.orgId ? this.org.orgId : 1 },
            });
          }
        } else if (this.org.password && this.isEqual) {
          await this.$apollo.mutate({
            mutation: UPDATEUSERPWD,
            variables: { ...this.org },
          });
        } else if (this.org.password) {
          alert('Password incorrect');
        } else {
          // alert('without Password');
          await this.$apollo.mutate({
            mutation: UPDATEUSER,
            variables: { ...this.org },
          });
        }
        this.saveLoading = false;
        this.dialog = false;
        this.$apollo.queries.users.refetch();
        if (this.item) this.fetchEmployees(this.item.id);
        window.location.reload();
      }
    },
    createUser(orgId) {
      this.org = {
        create: true,
        orgId,
        image: orgId ? 'https://png.pngtree.com/png-vector/20190228/ourlarge/pngtree-vector-engineer-icon-png-image_711642.jpg' : 'https://pngimage.net/wp-content/uploads/2018/06/organization-people-png-7.png',
      };
      this.dialog = true;
    },
    deleteUser(id) {
      this.$apollo.mutate({
        mutation: DELETEUSER,
        variables: { id },
      }).then(() => {
        this.$apollo.queries.users.refetch();
        this.dialog = false;
        window.location.reload();
      });
    },
  },
  components: {
    Organization,
  },
};
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}

.slide-fade-btn-enter-active {
  transition: all 1s ease;
}
.slide-fade-btn-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-btn-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
