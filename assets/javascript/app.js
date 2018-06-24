
var panel = $("#quiz-area");
var countStartNumber = 30;

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

// Variable to hold our setInterval
var timer;
var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(game.countdown, 1000);
    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {
    clearInterval(timer);
    $("#counter-number").html(game.counter);
    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  results: function() {
    clearInterval(timer);
    panel.html("<h2>Pop quiz over! Here is how you did...</h2>");
    $("#counter-number").html(game.counter);
    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(timer);
    game.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 6 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 6 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
