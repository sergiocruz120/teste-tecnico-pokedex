import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PokedexList from "../views/Pokedex/PokedexList.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/pokedex",
  },
  {
    path: "/pokedex",
    name: "PokedexList",
    component: PokedexList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
