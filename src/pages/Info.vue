<template>
  <div class="all">
    <h4 class="text-center">Informações sobre a utilização do site</h4>
    <ol class="lista" v-for="item in infoList" :key="item.id">
      <li class="item">{{ item.info }}</li>
    </ol>
    <div class="lastUpdate">
      V1
      <p>Last Update: 23/07/2023</p>
    </div>

    <q-footer v-model="footer" reveal elevated bordered>
      <p class="dev-title">
        Desenvolvido por:
        <a
          class="dev"
          href="https://www.linkedin.com/in/cl%C3%A1udio-raphael-cabral-095738203/"
          target="_blank"
          >Claudio Raphael</a
        >
      </p>
    </q-footer>
  </div>
</template>
<script>
import { infoList } from "src/utils/ItensList";
export default {
  data() {
    return {
      infoList,
    };
  },
};
</script>
<style scoped>
.all {
  color: white;
}
.lista {
  list-style: none;
  text-align: center;
}

.item {
  margin-bottom: 1%;
}

.lastUpdate {
  margin-top: 32%;
  margin-left: 1%;
}

.dev-title {
  text-align: center;
  margin-top: 1%;
}

.dev {
  text-decoration: none;
  color: white;
}

.dev:hover {
  color: orange;
}
</style>
