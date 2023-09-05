const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "info", component: () => import("pages/Info.vue") },
      { path: "vagas", component: () => import("pages/Vagas.vue") },
      { path: "faturamento", component: () => import("pages/Faturamento.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
