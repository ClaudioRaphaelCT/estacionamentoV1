<template>
  <q-page class="flex flex-center">
    <div>
      <CadastrarDialog></CadastrarDialog>
    </div>
  </q-page>
</template>

<script>
import CadastrarDialog from "src/components/CadastrarDialog.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CadastrarDialog,
  },
  data() {
    return {};
  },
});
</script>

<style scoped>
.title {
  color: white;
}

.data {
  color: white;
}

.btn {
  margin-left: 1%;
}
</style>
