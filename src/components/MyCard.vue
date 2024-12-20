<template>
  <section class="card">
    <ul class="card__list">
      <p class="card__loading" v-if="isLoading">Загрузка...</p>
      <li class="card__item" v-for="flight in flights" :key="flight.id">
        <div class="card__grid">
          <p class="card__subtitle">
            ЦЕНА: <span class="card__text"> {{ flight.price.total }} USD</span>
          </p>
          <p class="card__subtitle">
            АВИАКОМПАНИЯ:
            <span class="card__text">{{
              flight.validatingAirlineCodes[0]
            }}</span>
          </p>
          <p class="card__subtitle">
            КЛАСС:
            <span class="card__text">{{ flight.class || "Эконом" }}</span>
          </p>

          <div class="card__info">
            <p class="card__subtitle">
              {{ flight.itineraries[0].segments[0].departure.iataCode }} -
              {{
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.iataCode
              }}
            </p>
            <div
              class="card__time"
              v-for="(segment, idx) in flight.itineraries[0].segments"
              :key="idx"
            >
              <p class="card__text">
                Время: {{ trimTime(segment.departure.at) }} -
                {{ trimTime(segment.arrival.at) }}
              </p>
            </div>
          </div>

          <div class="card__info">
            <p class="card__subtitle">В ПУТИ</p>
            <p class="card__text">
              {{ changeOfHours(flight.itineraries[0].duration) }} ч
              {{ changeOfMinutes(flight.itineraries[0].duration) }} м
            </p>
          </div>

          <div
            class="card__info"
            v-if="flight.itineraries[0].segments.length - 1"
          >
            <p class="card__subtitle">
              {{ flight.itineraries[0].segments.length - 1 }} ПЕРЕСАДКА
            </p>
            <p class="card__text">
              Пересадка в:
              {{ flight.itineraries[0].segments[0].arrival.iataCode }}
            </p>
          </div>

          <div class="card__info" v-else>
            <p class="card__subtitle">БЕЗ ПЕРЕСАДКИ</p>
          </div>

          <div class="card__info">
            <p class="card__subtitle">
              БАГАЖ:
              <span class="card__text">{{
                flight.baggage || "Не указан"
              }}</span>
            </p>
          </div>

          <div class="card__info">
            <p class="card__subtitle">
              Дата вылета:
              <span class="card__text">
                {{
                  trimDate(flight.itineraries[0].segments[0].departure.at)
                }}</span
              >
            </p>
            <p class="card__subtitle">
              Дата прибытия:
              <span class="card__text">
                {{
                  trimDate(
                    flight.itineraries[0].segments[
                      flight.itineraries[0].segments.length - 1
                    ].arrival.at
                  )
                }}</span
              >
            </p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAccessToken, getFlightDestinations } from "@/api/api.js";
import { changeOfHours, changeOfMinutes, trimTime } from "@/helpers/cards.js";
import { trimDate } from "@/helpers/card.js";

defineProps({
  id: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const flightId = route.params.id;
const flights = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const token = await getAccessToken();
    flights.value = await getFlightDestinations(token);
    flights.value = flights.value.filter((el) => el.id === flightId);
  } catch (err) {
    console.error(`Ошибка при загрузке данных: ${err.message}`);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.card {
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__loading {
    text-align: center;
    margin-bottom: 20px;
  }

  &__list {
    overflow-y: auto;
  }

  &__item {
    background-color: rgb(250, 253, 255);
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 20px;
  }

  &__subtitle {
    color: rgb(191, 201, 208);
    font-size: 14px;
  }

  &__text {
    color: rgb(125, 125, 125);
    font-weight: 600;
    font-size: 14px;
  }

  &__subtitle:not(:last-child) {
    margin-bottom: 10px;
  }

  &__time:not(:last-child) {
    margin-bottom: 5px;
  }
}

@media (max-width: 730px) {
  .card {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, auto);
      align-items: center;
    }
  }
}

@media (max-width: 515px) {
  .card__grid {
    display: block;
  }
}
</style>
