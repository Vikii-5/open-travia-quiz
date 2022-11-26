let generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", function (event) {
  "use strict";

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
          let amount = document.getElementById("amount");
          let category = document.getElementById("category");
          let difficulty = document.getElementById("difficulty");
          let type = document.getElementById("type");

          let baseURL = `https://opentdb.com/api.php?`;

          if (amount.value !== "") {
            baseURL += `${amount.name}=${amount.value}&`;
            return baseURL;
          }

          if (category.value !== "") {
            baseURL += `${category.name}=${category.value}&`;
            return baseURL;
          }

          if (difficulty.value !== "") {
            baseURL += `${difficulty.name}=${difficulty.value}&`;
            return baseURL;
          }

          if (type.value !== "") {
            baseURL += `${type.name}=${type.value}&`;
            return baseURL;
          }

          console.log(baseURL.slice(0, -1));
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
  
});

