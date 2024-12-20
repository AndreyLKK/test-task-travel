<template>
  <section class="search">
    <input
      class="search__input"
      placeholder="Введите город для поиска: FLL, ATL"
      v-model="search"
      @input="onInput"
      type="text"
      tabindex="0"
    />
  </section>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const search = ref("");

const emit = defineEmits(["search"]);

const onInput = () => {
  emit("search", search.value);
};
</script>

<style lang="scss" scoped>
.search {
  background-color: rgb(255, 255, 255);
  padding-top: 30px;

  &__input {
    width: 100%;
    padding: 10px 10px 10px 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgb(235, 243, 250);
      &::placeholder {
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }
    }

    &:active {
      background-color: rgb(238, 248, 255);
    }

    &:focus {
      border-radius: 5px;
      border: 2px solid rgb(173, 218, 252);

      &::placeholder {
        opacity: 0.3;
        transition: opacity 0.3s ease;
      }
    }
  }
}
</style>
