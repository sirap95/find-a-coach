import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList";
import CoachDetail from "./pages/coaches/CoachDetail";
import CoachRegister from "./pages/coaches/CoachRegister";
import ContactCoach from "./pages/requests/ContactCoach";
import RequestsReceived from "./pages/requests/RequestsReceived";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound";
import store from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetail,
      children: [{ path: "contact", component: ContactCoach }],
    },
    { path: "/register", component: CoachRegister, meta: { requiresAuth: true}},
    { path: "/requests", component: RequestsReceived,  meta: { requiresAuth: true} },
    { path: "/auth", component: UserAuth,  meta: { requiresUnauth: true}},
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function(to, from, next) {
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  }else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  }else {
    next();
  }
});

export default router;
