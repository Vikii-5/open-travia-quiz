let baseURL = `https://opentdb.com/api.php?`;
let btn = document.getElementById("generate");

btn.addEventListener("click", function () {
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

  document.getElementById('quiz-form').reset();

  let url = baseURL.slice(0, -1);
  return fetchQuiz(url);
}

// function to fetch the data for user configured api url
const fetchQuiz = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => showQuiz(data.results))
    .catch(err => console.log(err));
}

const showQuiz = quizzes => {

  let mainContainer = document.getElementById('main-container');
  let quizContainer = document.createElement("div");
  quizContainer.className = 'row gx-5 p-4';
  mainContainer.appendChild(quizContainer);

  quizzes.forEach(quiz => {

    let qaContainer = document.createElement('div');
    qaContainer.setAttribute('id', 'qa-container');
    qaContainer.className = 'col-sm-12 col-lg-6'
    quizContainer.appendChild(qaContainer);

    let typeContainer = document.createElement('div');
    typeContainer.setAttribute('id', 'type-container');
    qaContainer.appendChild(typeContainer);

    let category = document.createElement('small');
    category.className = 'category';
    category.innerText = `Category: ${quiz.category}`
    typeContainer.appendChild(category);

    let difficulty = document.createElement('small');
    difficulty.className = 'difficulty';
    difficulty.innerText = `Difficulty: ${quiz.difficulty}`;
    typeContainer.appendChild(difficulty);

    let question = document.createElement('p');
    question.className = 'question';
    question.innerText = `${quiz.question}`
    qaContainer.appendChild(question);

    let correctAns = quiz.correct_answer;

    let choices = quiz.incorrect_answers;
    choices.splice(Math.floor(Math.random() * 3), 0, correctAns);

    choices.forEach( choice => {
      
      let choiceText = document.createElement('span');
      choiceText.className = 'choice-text';
      choiceText.innerText = `${choice}`
      qaContainer.appendChild(choiceText)

      choiceText.onclick = validateAnswer;

    })

    console.log(quiz);
    

  })

}

const validateAnswer = (event) => {
  
  console.log(event.target.innerText);
  console.log(correctAns)
  let selectedAnswer = event.target.innerText;

  
}
