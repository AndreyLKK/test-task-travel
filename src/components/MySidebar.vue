<template>
  <section class="sort">
    <h2 class="sort__title">Количество пересадок</h2>
    <p class="visually-hidden">Фильтрация рейсов по количеству пересадок</p>
    <label
      v-for="(label, index) in options"
      :key="index"
      class="sort__label"
      tabindex="0"
    >
      <input
        class="sort__input"
        type="checkbox"
        v-model="selectedOptions"
        :value="label.value"
        @change="emitSelectionChange"
        tabindex="1"
      />

      <span class="sort__checkbox">
        <MyIcons v-if="selectedOptions.includes(label.value)" type="check" />
      </span>
      {{ label.text }}
    </label>
  </section>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import MyIcons from "@/UI/MyIcons.vue";

const options = [
  { text: "Все", value: null },
  { text: "Без пересадок", value: 0 },
  { text: "1 пересадка", value: 1 },
  { text: "2 пересадки", value: 2 },
  { text: "3 пересадки", value: 3 },
];

const selectedOptions = ref([null]);

const emit = defineEmits(["update:selectedOptions"]);

const emitSelectionChange = () => {
  emit("update:selectedOptions", selectedOptions.value);
};
</script>

<style lang="scss" scoped>
.sort {
  background-color: rgb(255, 255, 255);
  padding: 30px 0px;
  border-radius: 10px;

  &__title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 0px 30px;
  }

  &__label {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    position: relative;
    width: 100%;
    transition: background-color 0.4s;
    cursor: pointer;

    &:hover {
      background-color: rgb(241, 252, 255);
    }

    &:active {
      background-color: rgb(226, 248, 255);
    }

    &:focus {
      background-color: rgb(240, 251, 255);
      outline: transparent;
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
  }

  &__checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid rgb(33, 150, 243);
    border-radius: 4px;
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-right: 10px;
    transition: border-color 0.4s;

    &:hover {
      border-color: rgb(168, 236, 255);
    }

    &:active {
      border-color: rgb(226, 248, 255);
    }

    &:focus {
      border-color: rgb(240, 251, 255);
    }
  }

  &__checkbox svg {
    width: 14px;
    height: 14px;
    fill: rgb(33, 150, 243);
  }

  &__input:checked + &__checkbox {
    border-color: #007bff;
  }

  &__checkbox svg {
    display: block;
  }
}

@media (max-width: 720px) {
  .sort {
    &__title {
      padding: 0px 20px;
    }
    &__label {
      padding: 10px 20px;
    }
    &__title {
      font-size: 20px;
    }
  }
}
</style>
