<template>
  <!-- como add uma imagem <img alt="Vue logo" src="./assets/logo.png"> -->
  <ResultScore  :humanProps="this.humanScore" :machineProps="this.machineScore" />  

  <div style="width: 600px;border-top: 0.5px; border-style: solid; border-color: gray; margin-top: 16px;margin-left: auto; margin-right: auto;"></div>
  <!-- machineValue="5" -->
  <div style="display: flex; flex-direction: column;width: 600px; margin-top:20px; margin-left: auto;margin-right: auto;">
    <h1 v-html="this.question">
    </h1>

    <!-- <div style="display: flex;flex-direction: row;margin: 8px;">
      <input type="radio" name="options" value="true">
      <label>True</label>
    </div>
   
    <div style="display: flex;flex-direction: row;margin: 8px;">
      <input type="radio" name="options" value="false">
      <label>False</label>
    </div> -->

    <!-- v-bind="answer" -->
    <div v-if="this.allAnswer">
    <div v-for="answer in this.allAnswer"  :key="answer" style="display: flex;flex-direction: row;margin: 8px;">
      <input :disabled="(this.displayBoolean == true || this.displayBoolean == false)" type="radio" name="options" :value="answer" v-model="this.responseQuestion">
      <label v-html="answer"></label>
    </div> 

    <!-- margin-top: 24px; margin-bottom: 24px; -->
    <div v-if="this.displayResult != ''" style="width: 100%; display: flex; flex-direction: row;justify-content: space-around;">
      <h3 :style="this.displayBoolean == true ? 'color:green' : 'color:red' ">{{ this.displayResult }} </h3> : <h3 style="color:gray" v-html="this.correctAnswer"></h3>
    </div>
    
    <button v-if="this.displayBoolean == null && this.question" @click="sendResponse()" :style="!this.responseQuestion ? 'background-color:gray' : 'background-color: royalblue' " :disabled="!this.responseQuestion" class="send" type="button" style="color: white; font-size: 18px; width: 100%;margin-top: 16px;padding-top: 8px; padding-left: 16px; padding-bottom: 8px; padding-right: 16px; border-radius: 25px;">Send</button>
    
    <button v-if="this.displayBoolean == true || this.displayBoolean == false" @click="nextQuestion()" class="send" type="button" style="background-color:green; color: white; font-size: 18px; width: 100%;margin-top: 16px;padding-top: 8px; padding-left: 16px; padding-bottom: 8px; padding-right: 16px; border-radius: 25px;">Next</button>

  </div>
  </div>
</template>

<script>

import ResultScore from './components/ResultScore.vue'; 

export default {

  name: 'App',
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      allAnswer: undefined,
      responseQuestion: null,
      displayResult: '',
      displayBoolean: null,//undefined
      humanScore: 0,
      machineScore: 0
    }
  },
  components: {
    ResultScore
  },
  methods: {
    getList() {

      //https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=boolean
      //https://opentdb.com/api.php?amount=1&category=15
      /*

      category
: 
"Entertainment: Video Games"
correct_answer
: 
"False"
difficulty
: 
"easy"
incorrect_answers
: 
Array(1)
0
: 
"True"
length
: 
1
[[Prototype]]
: 
Array(0)
question
: 
"In &quot;Undertale&quot;, the main character of the game is Sans."
type
: 
"boolean"

*/

      this.axios.get("https://opentdb.com/api.php?amount=1&category=15").then(async (response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
        this.allAnswer = this.incorrectAnswers;
        this.allAnswer.push(this.correctAnswer);
        console.log(response.data);
        console.log(this.question);
        console.log(this.incorrectAnswers);
        console.log(this.correctAnswer);
        console.log(this.allAnswer);
        await this.shufferArrayAnswer(); 
     
      
      });
      // // or
      // this.$http.get(api).then((response) => {
      //   console.log(response.data)
      // })
    },
    shufferArrayAnswer() {
      if(this.allAnswer.length > 0) {

        //shuffle embaralhar a array
        this.allAnswer = this.allAnswer.sort(function () {
          return Math.random() - 0.5;
        });

        console.log(this.allAnswer);

      }
    },
    sendResponse() {
      if(this.responseQuestion == this.correctAnswer) {
        //alert("RESPOSTA CORRETA");
        this.displayResult = "Resposta Correta! ";// + this.correctAnswer;
        this.displayBoolean = true;
        this.responseQuestion = null;
        //this.humanScore = this.humanScore + 1;
        this.humanScore++;
      } else {
        //alert("RESPOSTA ERRADA");
        this.displayResult = "Resposta errada! Opção correta: ";// + this.correctAnswer;
        this.displayBoolean = false;
        this.responseQuestion = null;
        this.machineScore++;
      }
    },
    nextQuestion() {
      this.displayResult = '',
      this.displayBoolean = null;

      this.getList();
    }
  },
  beforeCreate() { //executa antes de criar
      console.log("Before Create");
    },
    created() { //executa depois de criar o html - INIT DA APLICAÇÃO QUE PODE CHAMAR FUNCIONALIDADES E POPULAR CAMPOS
      console.log("Created");
      // 
      this.getList();


    },
    beforeUpdate() { //executa apos atualizar algo da DOM html
      console.log("Before Update");
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
