import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import PokedexList from "../views/Pokedex/PokedexList.vue";
import PokedexDetail from "../views/Pokedex/PokedexDetail.vue";


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
  {
    path: "/pokedex/:id",
    name: "PokedexDetail",
    component: PokedexDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
