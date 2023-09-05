import db from "../service/conn";

export const MixinUtils = {
  methods: {
    async getData() {
      const snapshot = await db.collection("entrada").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    async getDataFat() {
      const snapshot = await db.collection("faturamento").get();
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
    async choiceCar(placa) {
      this.showCarro = true;
      this.carros.placa = await db.collection("entrada").doc(placa).id;
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
    },
  },
};
