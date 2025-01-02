<template>
  <div>
    <h1>Survey App</h1>
    <input v-model="newQuestion" placeholder="Escribe una pregunta" />
    <button @click="addNewQuestion">Añadir Pregunta</button>

    <ul>
      <li v-for="(question, index) in questions" :key="index">
        {{ question.text }} - Sí: {{ question.votesYes }} / No: {{ question.votesNo }}
        <button @click="voteYes(index)">Votar Sí</button>
        <button @click="voteNo(index)">Votar No</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initEthereum, addQuestion, voteYes, voteNo, getQuestionsCount, getQuestion } from "../services/etherum";

export default defineComponent({
  name: "SurveyApp",
  data() {
    return {
      newQuestion: "",
      questions: [] as { text: string; votesYes: number; votesNo: number }[],
    };
  },
  async mounted() {
    await initEthereum(); // Inicializa la conexión con el contrato
    await this.loadQuestions(); // Carga las preguntas existentes
  },
  methods: {
    async addNewQuestion() {
      if (!this.newQuestion) return;
      await addQuestion(this.newQuestion);
      this.newQuestion = ""; // Resetea el input
      await this.loadQuestions(); // Recarga las preguntas
    },
    async voteYes(questionId: number) {
      await voteYes(questionId);
      await this.loadQuestions(); // Recarga las preguntas
    },
    async voteNo(questionId: number) {
      await voteNo(questionId);
      await this.loadQuestions(); // Recarga las preguntas
    },
    async loadQuestions() {
      const count = await getQuestionsCount();
      const loadedQuestions = [];
      for (let i = 0; i < count; i++) {
        const [text, votesYes, votesNo] = await getQuestion(i);
        loadedQuestions.push({ text, votesYes, votesNo });
      }
      this.questions = loadedQuestions;
    },
  },
});
</script>

<style>
/* Añade estilos aquí si es necesario */
</style>
