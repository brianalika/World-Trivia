
var deck = $("#quiz-section");
var countDown = 15;

var questions = [{
  question: "In which city was the United Nations formed?",
  answers: ["San Francisco", "New York", "Paris", "Cologne"],
  correctAnswer: "San Francisco",
  image: "assets/images/sanfrancisco.png"
}, {
  question: "Where did Mohandas Gandhi first start practicing civil disobedience?",
  answers: ["England", "India", "South Africa", "United States"],
  correctAnswer: "South Africa",
  image: "assets/images/gandhi.png"
}, {
  question: "Which country has the largest Muslim population in the world?",
  answers: ["Saudi Arabia", "Malaysia", "Iran", "Indonesia"],
  correctAnswer: "Indonesia",
  image: "assets/images/indonesia.png"
}, {
  question: "The words tomato and chocolate come from which ancient language?",
  answers: ["Latin", "Choco", "Nahuatl", "Old Norse"],
  correctAnswer: "Nahuatl",
  image: "assets/images/nahuatl.png"
}, {
  question: "Which of the following religious groups do NOT have roots in Ethiopia?",
  answers: ["Beta Israel Judaism", "Orthodox Tewahedo Christianity", "Rastafarianism", "Sufism"],
  correctAnswer: "Sufism",
  image: "assets/images/ethiopia.png"
}, {
  question: "The Chinese name for China translates into English as:",
  answers: ["Beautiful Land", "Great Nation", "Middle Kingdom", "Sunrise Empire"],
  correctAnswer: "Middle Kingdom",
  image: "assets/images/china.png"
}, {
  question: "Euskara is believed to be a language dating back to the Stone Age. On which continent is Euskara spoken as an official language?",
  answers: ["Africa", "South America", "Asia", "Europe"],
  correctAnswer: "Europe",
  image: "assets/images/euskara.png"
}, {
  question: "The following countries do NOT have a military, except for:",
  answers: ["Iceland", "Costa Rica", "Switzerland", "Vatican City"],
  correctAnswer: "Switzerland",
  image: "assets/images/switzerland.png"
}];

var timer;
var game = {

  questions: questions,
  historyQuestion: 0,
  counter: countDown,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#number").html(game.counter);
    if (game.counter === 0) {
      game.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    deck.html("<h2>" + questions[this.historyQuestion].question + "</h2>");
    for (var i = 0; i < questions[this.historyQuestion].answers.length; i++) {
      deck.append("<button class='answer-button' id='button' data-name='" + questions[this.historyQuestion].answers[i]
      + "'>" + questions[this.historyQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countDown;
    $("#number").html(game.counter);
    game.historyQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {
    clearInterval(timer);
    $("#counter-number").html(game.counter);
    deck.html("<h2>Times Up!</h2>");
    deck.append("<h3>The correct response was: " + questions[this.historyQuestion].correctAnswer);
    deck.append("<img src='" + questions[this.historyQuestion].image + "' />");
    if (game.historyQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);
    deck.html("<h2>Pop quiz over! Here is how you did...</h2>");
    $("#number").html(game.counter);
    deck.append("<h3>Correct Answers: " + game.correct + "</h3>");
    deck.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    deck.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    deck.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.historyQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    deck.html("<h2>Nope!</h2>");
    deck.append("<h3>The correct answer was: " + questions[game.historyQuestion].correctAnswer + "</h3>");
    deck.append("<img src='" + questions[game.historyQuestion].image + "' />");
    if (game.historyQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(timer);
    game.correct++;
    deck.html("<h2>Correct!</h2>");
    deck.append("<img src='" + questions[game.historyQuestion].image + "' />");
    if (game.historyQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  reset: function() {
    this.historyQuestion = 0;
    this.counter = countDown;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-box").prepend("<h2>Time Remaining: <span id='number'>15</span> Seconds</h2>");
  game.loadQuestion();
});
