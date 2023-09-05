<template>
  <div>
    <h4 class="title">Faturamento</h4>
    <h6 class="title">Total: R${{ total }}</h6>
  </div>
</template>
<script>
import { MixinUtils } from "src/utils/MixinUtils";
export default {
  data() {
    return {
      valor: [],
      newValor: null,
      total: null,
    };
  },
  mixins: [MixinUtils],
  async created() {
    this.valor = await this.getDataFat();
    this.newValor = parseInt(
      this.valor.map((e) => {
        return e.valor;
      })
    );
    this.total = this.valor.reduce((total, item) => total + item.valor, 0);
  },
};
</script>
<style scoped>
.title {
  color: white;
  text-align: center;
}
</style>
