import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import FlightBooking from "@/views/FlightBookingPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "Поиск рейсов по всему миру",
    },
  },
  {
    path: "/flight/:id",
    name: "FlightBooking",
    component: FlightBooking,
    props: true,
    meta: {
      title: "Информация о рейсе и бронирование",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, next) => {
  const title = to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;
