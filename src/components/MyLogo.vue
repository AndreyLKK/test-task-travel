<template>
  <header class="header">
    <router-link class="header__link" to="/">
      <img
        class="header__logo"
        src="@/assets/logo.png"
        alt="Логотип сайта Билеты на рейсы по всему миру"
      />

      <h1 class="header__title visually-hidden">
        Билеты на рейсы по всему миру
      </h1>
    </router-link>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  margin: 20px 0px;

  &__logo {
    width: 100px;
    height: 100px;
  }

  &__link {
    &:focus {
      border: 2px solid rgb(194, 224, 247);
      border-radius: 15px;
    }
  }
}

@media (max-width: 650px) {
  .header {
    &__logo {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
