<template lang="pug">
    v-container(style="height: 100%; overflow: hidden").pb-0
        v-layout.flex-row.justify-space-between.align-center
            .display-1 {{ title }}
            v-btn(outlined @click="() => { $emit('click', id) }") Create
        v-row
          v-col(cols="4" v-for="(item, index) in users" :key="index").list-group-item.item
              v-card
                  v-card-text
                      v-layout.flex-row.align-center
                          img(:src="item.image" alt="Organizations").image
                          v-layout.ml-5.flex-column
                              .caption {{ `Name: ${item.name}` }}
                              .caption {{ `Username: ${item.username}` }}
                              .caption {{ `Phone: ${item.phone}` }}
                              div
                                v-btn(icon small @click="$emit('edited', item.id)")
                                  v-icon(small) edit
                                v-btn(icon small @click="$emit('deleted', item.id)")
                                  v-icon(small).red--text delete
</template>
<script>
export default {
  props: ['users', 'title', 'id'],
  computed: {
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
