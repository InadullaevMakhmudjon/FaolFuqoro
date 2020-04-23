<template lang="pug">
    v-card.mt-2.mb-2
        v-card-text
            v-layout.flex-row.align-center
                img(src="@/assets/operator.png" alt="Operators").image-bordered
                v-layout.ml-5.flex-column
                    div(v-if="name").caption {{ `Name: ${name}` }}
                    div(v-if="phone").caption {{ `Phone: ${phone}` }}
                    div(v-if="status").caption Status:
                      span(:class="`${color}--text`").caption  {{ status }}
                    div(v-if="lastSeen").caption {{ `Last seen: ${lastSeen}` }}
                    v-btn(outlined v-if="messageBtn").mt-3
                      v-icon(small) message
                      .caption.ml-3 Message
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    lastSeen: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: 'blue',
      required: false,
    },
    messageBtn: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
