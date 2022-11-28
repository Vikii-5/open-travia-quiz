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

const fetchQuiz = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => showQuestion(data.results));
}

const showQuestion = questions => {

  questions.forEach(question => {

    console.log(question);

  })

}
