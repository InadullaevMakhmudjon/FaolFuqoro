<template lang="pug">
    v-menu(
        v-model="value"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    )
        template(v-slot:activator="{ on }")
            v-text-field(
                v-model="date"
                label="Sanani tanlang"
                prepend-icon="event"
                readonly
                v-on="on"
            )
        v-date-picker(
            v-model="date"
            no-title
            scrollable
        )
</template>
<script>
export default {
  name: 'DatePicker',
  props: ['value'],
  data() {
    return {
      date: (new Date()).toISOString().substr(0, 10),
    };
  },
  watch: {
    date(value) {
      this.$emit('date', value);
    },
  },
};
</script>
