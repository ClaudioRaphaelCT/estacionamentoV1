<template>
  <q-btn
    label="Realizar Entrada"
    color="primary"
    @click="showCadastrar = true"
  />
  <q-dialog
    v-model="showCadastrar"
    transition-show="flip-down"
    transition-hide="flip-up"
  >
    <q-card class="card">
      <q-bar>
        <div>{{ horas }}</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6 text-center">Cadastrar entrada</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="inpt"
          standout="bg-black text-white"
          v-model="newItem.placa"
          label="Placa"
          mask="AAA#A##"
        />
        <q-input
          standout="bg-black text-white"
          v-model="newItem.modelo"
          label="Modelo"
        />
        <q-select
          class="inpt"
          standout="bg-black text-white"
          v-model="newItem.cor"
          :options="colorOptions"
          label="Cor"
        />
        <q-btn
          class="btnConfirmar"
          color="purple"
          icon="check"
          label="Confirmar"
          @click="addItem"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="alert">
    <q-card class="card-erro">
      <q-card-section>
        <div class="text-h6">ERROR!!</div>
      </q-card-section>
      <ul>
        <p v-if="newItem.placa.length < 3">
          Erro: O campo <span class="erro">PLACA</span> encontra-se vazio!
        </p>
        <p v-else-if="newItem.modelo.length < 3">
          Erro: O campo <span class="erro">MODELO</span> encontra-se vazio!
        </p>
        <p v-else-if="newItem.cor.length < 3">
          Erro: O campo <span class="erro">COR</span> não foi preenchido.
        </p>
        <p v-else>Erro: Os campos não foram preenchidos corretamente!</p>
        <p class="obs">Preencher os todos os campos corretamente.</p>
      </ul>

      <q-card-section class="q-pt-none"> </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import db from "src/service/conn";
export default {
  name: "CadastrarDialog",
  data() {
    return {
      showCadastrar: false,
      alert: false,
      data: new Date(),
      horas: "",
      colorOptions: [
        "Branco",
        "Cinza",
        "Prata",
        "Preto",
        "Vermelho",
        "Amarelo",
        "Cor especifica",
      ],
      newItem: {
        placa: "",
        modelo: "",
        cor: "",
        data: new Date(),
      },
    };
  },
  created() {
    this.horas = `${this.data.getHours()}: ${
      this.data.getMinutes() < 10
        ? "0" + this.data.getMinutes()
        : this.data.getMinutes()
    }`;
  },
  methods: {
    async addItem() {
      if (
        this.newItem.placa.length < 6 ||
        this.newItem.modelo.length < 3 ||
        this.newItem.cor.length <= 1
      ) {
        this.alert = true;
      } else {
        await db.collection("entrada").doc().set(this.newItem);
        this.newItem = {
          placa: "",
          modelo: "",
          cor: "",
        };
      }
    },
  },
};
</script>
<style scoped>
.card {
  background-color: DodgerBlue;
  color: white;
  width: 400px;
}
.btn {
  margin-top: 15%;
  margin-left: 10%;
}
.inpt {
  margin-top: 5%;
  margin-bottom: 3%;
  color: white;
}

.btnConfirmar {
  width: 280px;
  margin-left: 13%;
  margin-top: 5%;
}

.card-erro {
  background-color: black;
  color: whitesmoke;
}

.obs {
  margin-right: 2%;
}

.erro {
  background-color: red;
  color: white;
}
</style>
