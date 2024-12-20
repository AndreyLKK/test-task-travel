<template>
  <div class="icons">
    <svg
      v-if="type === 'check'"
      xmlns="http://www.w3.org/2000/svg"
      height="16px"
      viewBox="0 -960 960 960"
      width="16px"
      fill="#007bff"
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: "check",
    },
  },
};
</script>
