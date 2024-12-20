<template>
  <section class="reservation">
    <button
      class="reservation__btn"
      v-if="!visibleReservation"
      @click="toggleReservation"
    >
      Забронировать?
    </button>
    <form
      v-if="visibleReservation"
      @submit.prevent="handlerReservation"
      action="#"
      method="post"
      class="reservation__form"
    >
      <h2 class="reservation__title">Форма бронирования авиабилета</h2>

      <fieldset class="reservation__data">
        <legend class="reservation__subtitle">Личные данные</legend>
        <div class="reservation__inner">
          <label class="reservation__label" for="first-name"
            >Имя:
            <input
              class="reservation__input"
              type="text"
              id="first-name"
              name="first-name"
              placeholder="Ваше имя"
              v-model="firstName"
              required
            />
          </label>
          <label class="reservation__label" for="last-name"
            >Фамилия:
            <input
              class="reservation__input"
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Ваша фамилия"
              v-model="lastName"
              required
            />
          </label>
          <label class="reservation__label" for="passport-number"
            >Номер паспорта:
            <input
              class="reservation__input"
              type="text"
              id="passport-number"
              name="passport-number"
              placeholder="Номер паспорта"
              v-model="passportNumber"
              required
            />
          </label>
          <label class="reservation__label" for="dob"
            >Дата рождения:
            <input
              class="reservation__input"
              type="date"
              id="dob"
              name="dob"
              v-model="dob"
              required
            />
          </label>
          <label class="reservation__label" for="nationality"
            >Гражданство:
            <input
              class="reservation__input"
              type="text"
              id="nationality"
              name="nationality"
              placeholder="Ваше гражданство"
              v-model="nationality"
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset class="reservation__data">
        <legend class="reservation__subtitle">Контактные данные</legend>
        <div class="reservation__inner">
          <label class="reservation__label" for="email"
            >Email:
            <input
              class="reservation__input"
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              v-model="email"
              required
            />
          </label>
          <label class="reservation__label" for="phone"
            >Телефон:
            <input
              class="reservation__input"
              type="tel"
              id="phone"
              name="phone"
              placeholder="+7 (123) 456-78-90"
              v-model="phone"
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset class="reservation__data">
        <legend class="reservation__subtitle">Багаж</legend>
        <div class="reservation__inner">
          <label class="reservation__label" for="baggage"
            >Тип багажа:
            <select
              class="reservation__input"
              id="baggage"
              name="baggage"
              v-model="baggage"
              required
            >
              <option value="none">Без багажа</option>
              <option value="carry">Ручная кладь</option>
              <option value="checked">Зарегистрированный багаж</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset class="reservation__data">
        <legend class="reservation__subtitle" @click="toggleTerms">
          Подтверждение
        </legend>
        <div class="reservation__inner">
          <label class="reservation__label" tabindex="0"
            >Я согласен с условиями бронирования:
            <input
              class="reservation__input reservation__input-checkbox"
              type="checkbox"
              v-model="terms"
              tabindex="1"
            />
            <span class="reservation__checkbox">
              <MyIcons type="check" v-if="terms" />
            </span>
          </label>
        </div>
      </fieldset>

      <button class="reservation__btn" type="submit">Забронировать</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import MyIcons from "@/UI/MyIcons.vue";

const visibleReservation = ref(false);
const firstName = ref("");
const lastName = ref("");
const passportNumber = ref("");
const nationality = ref("");
const email = ref("");
const phone = ref("");
const dob = ref("");
const terms = ref(false);
const baggage = ref("none");

const toggleTerms = () => {
  terms.value = !terms.value;
};

const toggleReservation = () => {
  visibleReservation.value = !visibleReservation.value;
};

const handlerReservation = () => {
  alert("Вы успешно забронировали билет!");
  firstName.value = "";
  lastName.value = "";
  passportNumber.value = "";
  nationality.value = "";
  email.value = "";
  phone.value = "";
  dob.value = "";
  terms.value = false;
  baggage.value = "none";
};
</script>

<style lang="scss" scoped>
.reservation {
  &__form {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 10px;
    border-radius: 10px;
  }

  &__data {
    border: 1px solid rgb(33, 150, 243);
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 8px;
  }

  &__subtitle {
    font-weight: 500;
    font-size: 20px;
    border-radius: 10px;
  }

  &__data {
    border: 1px solid rgb(33, 150, 243);
    border-radius: 8px;
    padding: 15px;
  }

  &__subtitle {
    font-weight: 500;
    font-size: 20px;
    padding: 0 5px;
  }

  &__inner {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 10px;
  }

  &__label {
    width: fit-content;
    &:focus {
      outline: transparent;
      border-radius: 5px;
      border: 2px solid rgb(173, 218, 252);
    }
  }

  &__input {
    border: 1px solid rgb(157, 209, 252);
    border-radius: 10px;
    padding: 5px;

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
      border: 2px solid rgb(95, 180, 250);

      &::placeholder {
        opacity: 0.3;
        transition: opacity 0.3s ease;
      }
    }
  }

  &__btn {
    background-color: rgb(255, 255, 255);
    width: 100%;
    padding: 10px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgb(232, 244, 253);
    }
    &:active {
      background-color: rgb(171, 214, 247);
    }
    &:focus {
      background-color: rgb(194, 224, 247);
    }
  }

  &__input-checkbox {
    display: none;
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

  &__input-checkbox:checked + &__checkbox {
    border-color: #007bff;
  }

  &__checkbox {
    display: block;
  }
}

@media (max-width: 970px) {
  .reservation {
    &__inner {
      grid-template-columns: repeat(2, auto);
    }

    &__input {
      width: 100%;
    }
  }
}

@media (max-width: 515px) {
  .reservation__inner {
    display: block;
  }

  .reservation__title {
    font-size: 20px;
  }

  .reservation__subtitle {
    font-size: 16px;
  }

  .reservation__input::placeholder {
    font-size: 14px;
  }
}
</style>
