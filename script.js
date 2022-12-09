let baseURL = `https://opentdb.com/api.php?`;
let playbtn = document.getElementById("play");
let resetbtn = document.getElementById("reset");

let mainContainer = document.getElementById("main-container");

let loader = document.createElement("div");
loader.className = "lds-ripple";
mainContainer.appendChild(loader);
let inner1 = document.createElement("div");
loader.appendChild(inner1);
let inner2 = document.createElement("div");
loader.appendChild(inner2);
loader.style.display = "none";

let quizContainer = document.createElement("div");
quizContainer.setAttribute("id", "quiz-container");
quizContainer.className = "row justify-content-around";
mainContainer.appendChild(quizContainer);

playbtn.addEventListener("click", function () {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          generateAPI();
          loader.style.display = "inline-block";
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
});

// function for generating the api endpoint for users configuration
const generateAPI = () => {
  let amount = document.getElementById("amount");
  let category = document.getElementById("category");
  let difficulty = document.getElementById("difficulty");
  let type = document.getElementById("type");

  if (amount.value !== "") {
    baseURL += `${amount.name}=${amount.value}&`;
  }

  if (category.value !== "") {
    baseURL += `${category.name}=${category.value}&`;
  }

  if (difficulty.value !== "") {
    baseURL += `${difficulty.name}=${difficulty.value}&`;
  }

  if (type.value !== "") {
    baseURL += `${type.name}=${type.value}&`;
  }

  let url = baseURL.slice(0, -1);
  console.log(url);
  return fetchQuiz(url);
};

// function to fetch the data for user configured api url
const fetchQuiz = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showQuiz(data.results))
    .catch((err) => console.log(err));
};

// function to display the question and choices
const showQuiz = (quizzes) => {
  quizzes.forEach((quiz) => {
    let qaContainer = document.createElement("div");
    qaContainer.setAttribute("id", "qa-container");
    qaContainer.className = "col-sm-12 col-lg-6";
    quizContainer.appendChild(qaContainer);

    let typeContainer = document.createElement("div");
    typeContainer.setAttribute("id", "type-container");
    qaContainer.appendChild(typeContainer);

    let category = document.createElement("small");
    category.className = "category";
    category.innerText = `Category: ${quiz.category}`;
    typeContainer.appendChild(category);

    let difficulty = document.createElement("small");
    difficulty.className = "difficulty";
    difficulty.innerText = `Difficulty: ${quiz.difficulty}`;
    typeContainer.appendChild(difficulty);

    let question = document.createElement("p");
    question.className = "question";
    question.innerText = `${quiz.question}`;
    qaContainer.appendChild(question);

    let correctAns = quiz.correct_answer;

    let choices = quiz.incorrect_answers;
    choices.splice(Math.floor(Math.random() * 3), 0, correctAns);

    choices.forEach((choice) => {
      let choiceText = document.createElement("span");
      choiceText.className = "choice-text";
      choiceText.innerText = `${choice}`;
      qaContainer.appendChild(choiceText);
    
    loader.style.display ='none';

      // adding click event to choices to get select Answer and compare that with correct answer
      choiceText.addEventListener("click", function (event) {
        console.log(event.target.innerText);
        let selectedAnswer = event.target.innerText;
        if (selectedAnswer === correctAns) {
          console.log("correct Answer:" + correctAns);
          qaContainer.classList.add("right-glow");
          qaContainer.innerHTML = `
          <div class='correct-feedback'>
            <p>Well Done!!! Correct Answer</p>
          </div>`;
        } else {
          console.log("Answer is wrong. correct Answer:" + correctAns);
          qaContainer.classList.add("wrong-glow");
          qaContainer.innerHTML = `
          <div class='wrong-feedback'>
            <p>Uh-Oh!!! Wrong Answer. Correct Answer is ${correctAns}</p>
          </div>`;
        }
      });
    });

    console.log(quiz);
  });
};

// reloads the quiz
resetbtn.addEventListener("click", function () {
  window.location.reload();
});
