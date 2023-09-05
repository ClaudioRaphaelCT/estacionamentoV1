<template>
  <div>
    <div class="q-pa-md">
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Cor</th>
            <th>Realizar Saida</th>
          </tr>
        </thead>
        <tbody v-for="item in entrada" :key="item.id">
          <tr>
            <td @click="choiceCar(item.placa)">{{ item.placa }}</td>
            <td>{{ item.modelo }}</td>
            <td>{{ item.cor }}</td>
            <td class="saida" @click="deleteCar(item.id)">
              <q-icon name="delete_forever" />
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>

    <q-dialog
      v-model="showCarro"
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="card">
        <q-bar>
          <div></div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6 text-center">{{ carros.placa }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>Hora de entrada: {{ carros.data.toString() }}</p>
          <p>Valor a pagar: R$ {{ carros.valorPagar }}</p>
        </q-card-section>
      </q-card>
    </q-dialog>
    <h6 class="qtdVagas">
      Vagas disponiveis: {{ vagasDisponiveis - entrada.length }}
    </h6>
  </div>
</template>
<script>
import db from "src/service/conn";
import { MixinUtils } from "src/utils/MixinUtils";
export default {
  data() {
    return {
      entrada: [],
      faturamento: [],
      hora: "",
      showCarro: false,
      vagasDisponiveis: 10,
      carros: { placa: [], data: "", valorPagar: 5 },
    };
  },
  mixins: [MixinUtils],
  async created() {
    this.entrada = await this.getData();
    this.faturamento = await this.getDataFat();
  },
  methods: {
    async deleteCar(id) {
      if (confirm("Tem certeza que deseja excluir esse item?")) {
        // Recupera o carro a ser excluído
        const carToDelete = this.entrada.find((car) => car.id === id);
        console.log(carToDelete);
        // Exclui o carro da tabela "entrada"
        await db.collection("entrada").doc(id).delete();
        //Capturar a data pra fazer calculo do valor a pagar
        this.carros.data = await this.entrada
          .filter((e) => {
            return e.placa == this.carros.placa;
          })
          .map((e) => {
            const horaFirebase = e.data.seconds * 1000;
            const date = new Date(horaFirebase);
            const horas = date.getHours();
            const minutos = date.getMinutes();
            const horarioFull = `${horas < 10 ? "0" + horas : horas}:${
              minutos < 10 ? "0" + minutos : minutos
            }`;
            return horarioFull;
          });
        const diaAtual = new Date();
        const horaAtual = parseInt(diaAtual.getHours());
        if (horaAtual - parseInt(this.carros.data) <= 1) {
          this.carros.valorPagar = 5;
        } else {
          this.carros.valorPagar = (horaAtual - parseInt(this.carros.data)) * 5;
        }
        // Adiciona o valorPagar à tabela "faturamento"
        const valorPagar = this.carros.valorPagar;
        console.log(valorPagar);
        await db.collection("faturamento").add({ valor: valorPagar });
      }
      location.reload();
    },
  },
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #333;
  margin-bottom: 20px;
  color: whitesmoke;
  cursor: pointer;
}
th,
td {
  border: 1px solid #333;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  color: black;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
.qtdVagas {
  color: whitesmoke;
  margin-left: 1%;
}

td:hover {
  background-color: orange;
}

.saida {
  align-items: center;
  text-align: center;
}
.saida:hover {
  background-color: red;
}
</style>
