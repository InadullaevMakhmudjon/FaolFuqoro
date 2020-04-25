<template lang="pug">
    v-container(style="height: 100%; overflow: hidden").pb-0
        v-layout.flex-row.justify-space-between.align-center
            .display-1 {{ title }}
            v-btn(outlined @click="() => { $emit('click', id) }") Create
        draggable(
          v-model="deleteItems"
          v-show="users.length"
          draggable=".item"
          group="a"
        ).list-group.row.ma-5.custom-delete
        draggable(
          v-model="items"
          draggable=".item"
          group="a"
        ).list-group.row.mt-5
            v-col(cols="4" v-for="(item, index) in users" :key="index").list-group-item.item
                v-card
                    v-card-text
                        v-layout.flex-row.align-center
                            img(:src="item.image" alt="Organizations").image
                            v-layout.ml-5.flex-column
                                .caption {{ `Name: ${item.name}` }}
                                .caption {{ `Username: ${item.username}` }}
                                .caption {{ `Phone: ${item.phone}` }}
</template>
<script>
import draggable from 'vuedraggable';

export default {
  props: {
    users: {
      required: true,
      type: Array,
    },
    title: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      items: [],
      deleteItems: [],
    };
  },
  methods: {
    getAll() {

    },
  },
  components: {
    draggable,
  },
  watch: {
    title() {
      this.getAll();
    },
    deleteItems(value) {
      if (value.length) { this.$emit('deleted', value[value.length - 1].id); }
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>
<style scoped>
    .image {
        width: 60px;
        height: 60px;
        border: 2px solid lightgrey;
        border-radius: 50%;
        padding: 2px;
    }
    .custom-delete {
      background: rgba(255, 0, 0, .3);
      height: 120px;
      align-items: center;
      justify-content: center;
    }
</style>
