<template>
  <section class="cards">
    <p class="cards__loading" v-if="loading">Загрузка...</p>

    <ul class="cards__list">
      <li
        class="cards__item"
        v-for="flight in flights"
        :key="flight.id"
        tabindex="0"
      >
        <router-link :to="'/flight/' + flight.id" tabindex="1">
          <div class="cards__flex">
            <p class="cards__price">{{ flight.price.total }} USD</p>
            <p class="cards__airline">{{ flight.validatingAirlineCodes[0] }}</p>
          </div>

          <div class="cards__grid">
            <div class="cards__info">
              <p class="cards__subtitle">
                {{ flight.itineraries[0].segments[0].departure.iataCode }} -
                {{
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival.iataCode
                }}
              </p>
              <div
                class="cards__time"
                v-for="(segemt, idx) in flight.itineraries[0].segments"
                :key="idx"
              >
                <p class="cards__text">
                  {{ trimTime(segemt.departure.at) }} -
                  {{ trimTime(segemt.arrival.at) }}
                </p>
              </div>
            </div>

            <div class="cards__info">
              <p class="cards__subtitle">В ПУТИ</p>

              <p class="cards__text">
                {{ changeOfHours(flight.itineraries[0].duration) }} ч
                {{ changeOfMinutes(flight.itineraries[0].duration) }} м
              </p>
            </div>

            <div
              class="cards__info"
              v-if="flight.itineraries[0].segments.length - 1"
            >
              <p class="cards__subtitle">
                {{ flight.itineraries[0].segments.length - 1 }} ПЕРЕСАДКА
              </p>
              <p class="cards__text">
                {{ flight.itineraries[0].segments[0].arrival.iataCode }}
              </p>
            </div>

            <div class="cards__info" v-else>
              <p class="cards__subtitle">БЕЗ ПЕРЕСАДКИ</p>
              <p class="cards__text">-</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { getAccessToken, getFlightDestinations } from "@/api/api.js";
import {
  changeOfHours,
  changeOfMinutes,
  trimTime,
  sortFlights,
  filterFlights,
  searchFlights,
} from "@/helpers/cards.js";

const props = defineProps({
  selectedOptions: {
    type: Array,
    default: () => [],
  },
  filterType: {
    type: String,
  },
  searchValue: {
    type: String,
  },
});

const loading = ref(true);
const flights = ref(null);
const initialFlights = ref([]);

onMounted(async () => {
  try {
    const token = await getAccessToken();
    flights.value = await getFlightDestinations(token);
    initialFlights.value = [...flights.value];
  } catch (err) {
    `Ошибка при загрузке данных: ${err.message}`;
  } finally {
    loading.value = false;
  }
});

watch(
  () => props.searchValue,
  () => {
    flights.value = searchFlights(props.searchValue, initialFlights.value);
  }
);

watch(
  () => props.filterType,
  () => {
    filterFlights(props.filterType, flights.value);
  }
);

watch(
  () => props.selectedOptions,
  () => {
    flights.value = sortFlights(props.selectedOptions, initialFlights.value);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.cards {
  border-radius: 10px;
  font-size: 18px;

  &__loading {
    text-align: center;
  }

  &__item {
    background-color: rgb(250, 253, 255);
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;

    &:focus {
      border-radius: 5px;
      border: 2px solid rgb(173, 218, 252);
      outline: transparent;
    }
  }

  &__price {
    font-weight: 500;
    color: rgb(33, 150, 243);
    font-size: 32px;
  }

  &__airline {
    font-weight: 500;
    font-size: 24px;
  }

  &__subtitle {
    color: rgb(191, 201, 208);
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__text {
    font-weight: 600;
    font-size: 14px;
  }

  &__time:not(:last-child) {
    margin-bottom: 5px;
  }

  &__info:not(:last-child) {
    margin-bottom: 10px;
  }

  &__flex {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 10px;
  }
}

@media (max-width: 720px) {
  .cards__item {
    padding: 10px;
  }

  .cards__price {
    font-size: 24px;
  }

  .cards__airline {
    font-size: 20px;
  }

  .cards__grid {
    grid-template-columns: repeat(3, auto);
  }
}

@media (max-width: 450px) {
  .cards__grid {
    display: block;
  }
}
</style>
