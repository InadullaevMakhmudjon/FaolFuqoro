<template lang="pug">
    v-card.mt-2.mb-2
        v-card-text
            v-layout.flex-row.align-center
                img(:src="image" alt="Organizations").image-bordered
                v-layout.ml-5.flex-column
                    .caption {{ `Name: ${name}` }}
                    .caption {{ `Email: ${email}` }}
                    .caption {{ `Phone: ${phone}` }}
                    .caption {{ `Last seen: ${lastSeen}` }}
</template>
<script>
export default {
  props: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    lastSeen: {
      type: String,
    },
  },
};
</script>
