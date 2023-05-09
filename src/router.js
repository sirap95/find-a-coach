import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList";
import CoachDetail from "./pages/coaches/CoachDetail";
import CoachRegister from "./pages/coaches/CoachRegister";
import ContactCoach from "./pages/requests/ContactCoach";
import RequestsReceived from "./pages/requests/RequestsReceived";
import NotFound from "./pages/NotFound";

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
    { path: "/register", component: CoachRegister },
    { path: "/requests", component: RequestsReceived },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;