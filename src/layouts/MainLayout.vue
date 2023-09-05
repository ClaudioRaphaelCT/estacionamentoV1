<template>
  <q-layout view="lHh Lpr lFf" class="layout">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Estacionamento </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> O que deseja fazer? </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Cadastrar",
    caption: "Cadastrar entrada",
    icon: "add",
    link: "/",
  },
  {
    title: "Veiculos",
    caption: "Visualizar e realizar saída de veiculos",
    icon: "directions_car",
    link: "/#/vagas",
  },
  {
    title: "Faturamento",
    caption: "Visualizar o faturamento diario",
    icon: "paid",
    link: "/#/faturamento",
  },
  {
    title: "Informação",
    caption: "Regras sobre a utilização",
    icon: "support_agent",
    link: "/#/info",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.layout {
  background-color: black;
}
</style>
