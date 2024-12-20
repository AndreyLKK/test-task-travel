<template>
  <section class="filter">
    <button
      class="filter__button filter__button--rounding-left"
      :class="{ active: activeFilter === 'cheap' }"
      @click="setFilter('cheap')"
    >
      <p class="filter__text">Самый дешевый</p>
    </button>
    <button
      class="filter__button filter__button--rounding-right"
      :class="{ active: activeFilter === 'fast' }"
      @click="setFilter('fast')"
    >
      <p class="filter__text">Самый быстрый</p>
    </button>
  </section>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const activeFilter = ref("cheap");

const emit = defineEmits(["filterChange"]);

const setFilter = (type) => {
  activeFilter.value = type;
  emit("filterChange", type);
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
}

.filter__button {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &--rounding-left {
    border-radius: 10px 0px 0px 0px;
  }

  &--rounding-right {
    border-radius: 0px 10px 0px 0px;
  }
  &:hover {
    background-color: rgb(232, 244, 253);
  }
  &:active {
    background-color: rgb(171, 214, 247);
  }
  &:focus {
    border: 2px solid rgb(173, 218, 252);
  }

  &.active {
    background-color: rgb(33, 150, 243);
    &.active:hover {
      background-color: rgb(81, 171, 244);
    }
    &.active:active {
      background-color: rgb(97, 178, 245);
    }
    &.active:focus {
      background-color: rgb(52, 163, 255);
    }
  }
  &.active .filter__text {
    color: rgb(255, 255, 255);
  }

  .filter__text {
    color: rgb(125, 125, 125);
    margin: 0;
    font-size: 16px;
    text-align: center;
  }
}

@media (max-width: 720px) {
  .filter__button {
    padding: 20px 10px;
  }
}
</style>
