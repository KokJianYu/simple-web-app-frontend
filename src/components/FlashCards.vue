<template>
  <div class="flashcards">
    <b-button v-b-modal.edit-flashcard>Edit Flashcard</b-button>
    <b-button v-on:click="deleteCurrentFlashCard">Delete flashcard</b-button>
    <b-button v-b-modal.add-flashcard>Add Flashcard</b-button>
    <p>Flashcard {{ counter + 1 }} / {{ numberFlashCards }}</p>
    <vue-flashcard
      :front="currentCard[1]"
      :back="currentCard[2]"
      :key="refreshFlashcard"
      v-if="numberFlashCards > 0"
    ></vue-flashcard>
    <p v-else>No flashcards</p>
    <b-button variant="outline-primary" v-on:click="previousCard"
      >Previous flashcard</b-button
    >
    <b-button variant="outline-primary" v-on:click="nextCard"
      >Next flashcard</b-button
    >
    <b-modal
      id="edit-flashcard"
      title="Edit Flashcard"
      ok-title="Edit Flashcard"
      @ok="editCurrentFlashCard"
    >
      <b-form>
        Spanish Word:
        <b-form-input
          v-model="spanishWord"
          :state="spanishWordState"
          placeholder="Enter Spanish word"
        ></b-form-input>
        <b-form-invalid-feedback :state="spanishWordState">
          Spanish Word field must not be empty
        </b-form-invalid-feedback>
        English Word:<b-form-input
          v-model="englishWord"
          :state="englishWordState"
          placeholder="Enter English translation"
        ></b-form-input>
        <b-form-invalid-feedback :state="englishWordState">
          English Word field must not be empty
        </b-form-invalid-feedback>
      </b-form>
    </b-modal>

    <b-modal
      id="add-flashcard"
      title="Add Flashcard"
      ok-title="Add Flashcard"
      @ok="addNewFlashCard"
    >
      <b-form>
        Spanish Word:
        <b-form-input
          v-model="newSpanishWord"
          :state="newSpanishWordState"
          placeholder="Enter Spanish word"
        ></b-form-input>
        <b-form-invalid-feedback :state="newSpanishWordState">
          Spanish Word field must not be empty
        </b-form-invalid-feedback>
        English Word:<b-form-input
          v-model="newEnglishWord"
          :state="newEnglishWordState"
          placeholder="Enter English translation"
        ></b-form-input>
        <b-form-invalid-feedback :state="newEnglishWordState">
          English Word field must not be empty
        </b-form-invalid-feedback>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import API from "../api/api.js";
import vueFlashcard from "vue-flashcard";

export default {
  name: "FlashCards",

  created: async function() {
    await this.getFlashCard();
  },
  data: function() {
    return {
      flashCards: [],
      counter: 0,
      currentCard: "",
      spanishWord: "",
      englishWord: "",
      newSpanishWord: "",
      newEnglishWord: "",
      refreshFlashcard: 0,
      numberFlashCards: 0,
    };
  },
  components: { vueFlashcard },
  methods: {
    getFlashCard: async function() {
      var flashCardsPromise = await API.getFlashCard();
      this.flashCards = flashCardsPromise.data.flashcards;
      this.numberFlashCards = this.flashCards.length;
      this.currentCard = this.flashCards[this.counter];
      this.spanishWord = this.currentCard[1];
      this.englishWord = this.currentCard[2];
      console.log(this.currentCard);
    },
    deleteCurrentFlashCard: async function() {
      var currentIndex = this.counter;
      var id = this.flashCards[currentIndex][0];
      var promise = await API.deleteFlashCard(id);
      if (promise.data.id != id) {
        alert("Error deleting, please try again");
      } else {
        this.flashCards.splice(currentIndex, 1);
        this.numberFlashCards -= 1;
        this.currentCard = this.flashCards[this.counter];
        this.counter = this.counter % this.flashCards.length;
        this.spanishWord = this.currentCard[1];
        this.englishWord = this.currentCard[2];
      }
      this.refreshFlashcard += 1;
      console.log(this.numberFlashCards);
    },
    editCurrentFlashCard: async function() {
      var currentIndex = this.counter;
      var id = this.flashCards[currentIndex][0];
      var promise = await API.editFlashCard(
        id,
        this.spanishWord,
        this.englishWord
      );
      if (promise.data.id != id) {
        alert("Error editing, please try again");
      } else {
        this.flashCards[currentIndex][1] = this.spanishWord;
        this.flashCards[currentIndex][2] = this.englishWord;
        this.currentCard = this.flashCards[this.counter];
        this.counter = this.counter % this.flashCards.length;
        this.spanishWord = this.currentCard[1];
        this.englishWord = this.currentCard[2];
        console.log(this.currentCard);
      }
      this.refreshFlashcard += 1;
    },
    addNewFlashCard: async function() {
      var promise = await API.addFlashCard(
        this.newSpanishWord,
        this.newEnglishWord
      );
      console.log(promise.data.id);
      if (promise.data.id == null) {
        alert("Error adding, please try again");
      } else {
        var newCard = [
          promise.data.id,
          this.newSpanishWord,
          this.newEnglishWord,
        ];
        this.flashCards.push(newCard);
        this.numberFlashCards += 1;
        this.currentCard = this.flashCards[this.counter];
        this.counter = this.counter % this.flashCards.length;
        this.newSpanishWord = "";
        this.newEnglishWord = "";
      }
      this.refreshFlashcard += 1;
      console.log(this.numberFlashCards);
    },
    previousCard: function() {
      this.counter = (this.counter - 1) % this.flashCards.length;
      if (this.counter < 0) {
        this.counter = this.flashCards.length - 1;
      }
      this.currentCard = this.flashCards[this.counter];
      this.spanishWord = this.currentCard[1];
      this.englishWord = this.currentCard[2];
      this.refreshFlashcard += 1;
    },
    nextCard: function() {
      this.counter = (this.counter + 1) % this.flashCards.length;
      this.currentCard = this.flashCards[this.counter];
      this.spanishWord = this.currentCard[1];
      this.englishWord = this.currentCard[2];
      this.refreshFlashcard += 1;
    },
  },
  computed: {
    spanishWordState() {
      return this.spanishWord.length > 0 ? true : false;
    },
    newSpanishWordState() {
      return this.newSpanishWord.length > 0 ? true : false;
    },
    englishWordState() {
      return this.englishWord.length > 0 ? true : false;
    },
    newEnglishWordState() {
      return this.newEnglishWord.length > 0 ? true : false;
    },
  },
};
</script>

<style></style>
