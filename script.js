function genarateQuiz() {
  let amount = document.getElementById("amount");
  let category = document.getElementById("category");
  let difficulty = document.getElementById("difficulty");
  let type = document.getElementById("type");

  

  let URL = `https://opentdb.com/api.php?${amount.name}=${amount.value}&${category.name}=${category.value}&${difficulty.name}=${difficulty.value}&${type.name}=${type.value}`;

  console.log(URL);
}

let generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', genarateQuiz);