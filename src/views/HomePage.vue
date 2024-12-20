<template>
  <main class="travel">
    <MySidebar
      class="travel__sidebar"
      @update:selectedOptions="handleSelectionChange"
    />
    <div class="travel__content">
      <MyFilter class="travel__filter" @filterChange="handleFilterChange" />
      <MySerch class="travel__search" @search="handleSearch" />
      <MyCards
        :selectedOptions="selectedOptions"
        :filterType="filterType"
        :searchValue="searchValue"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import MySidebar from "@/components/MySidebar.vue";
import MyCards from "@/components/MyCards.vue";
import MyFilter from "@/components/MyFilter.vue";
import MySerch from "@/components/MySearch.vue";

const selectedOptions = ref([]);

const handleSelectionChange = (newSelectedOptions) => {
  selectedOptions.value = newSelectedOptions;
};

const filterType = ref("");
const searchValue = ref("");

const handleSearch = (value) => {
  searchValue.value = value;
};

const handleFilterChange = (type) => {
  filterType.value = type;
};
</script>

<style lang="scss">
.travel {
  display: flex;
  grid-gap: 40px;
  align-items: flex-start;
  &__sidebar {
    flex: 1;
  }

  &__content {
    flex: 2;
  }

  &__search {
    margin-bottom: 30px;
  }
}

@media (max-width: 720px) {
  .travel__inner {
    grid-gap: 30px;
  }
}

@media (max-width: 650px) {
  .travel__inner {
    display: block;
  }
}
</style>
