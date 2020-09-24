<template>
  <div class="flashcards">
    <b-button variant="outline-primary" v-on:click="flipSide">Flip card</b-button>
    <b-button variant="outline-primary" v-on:click="getFlashCard">get flashcard</b-button>
    <b-button variant="outline-primary" v-on:click="deleteCurrentFlashCard">delete flashcard</b-button>
    <b-button variant="outline-primary" v-on:click="nextCard">next flashcard</b-button>
    <p>{{ cardDisplay }}</p>
  </div>
</template>

<script>
import API from "../api/api.js";
export default {
  name: "FlashCards",
  data: function() {
    return {
      flashCards: [],
      counter: 0,
      side: 1,
      cardDisplay: "",
    };
  },

  methods: {
    getFlashCard: async function() {
      var flashCardsPromise = await API.getFlashCard();
      this.flashCards = flashCardsPromise.data.flashcards;
      this.cardDisplay = this.flashCards[this.counter][this.side];
    },
    deleteCurrentFlashCard: async function() {
      var currentIndex = this.counter;
      var id = this.flashCards[currentIndex][0];
      var promise = await API.deleteFlashCard(id);
      if (promise.data.id != id) {
        alert("Error deleting, please try again");
      } else {
        this.flashCards.splice(currentIndex, 1);
      }
    },
    nextCard: function() {
      this.counter = (this.counter + 1) % this.flashCards.length;
      this.side = 1;
      this.cardDisplay = this.flashCards[this.counter][this.side];
    },
    flipSide: function() {
      this.side = (this.side % 2) + 1;
      this.cardDisplay = this.flashCards[this.counter][this.side];
    },
  },

  mounted: function() {
    this.getFlashCard();
  },
};
</script>
