let container = document.querySelector(".container");
let mainWord = document.querySelector("#main-word");
let nextButton = document.querySelector("#next-button");
let helpButton = document.querySelector("#help-button");
let showModal = document.querySelector("#show-modal");
let modal = document.querySelector("#modal-menu");
let mode = document.querySelector("#mode");
let helperDesc = document.querySelector("#helper-desc");
let emptyAddWord = document.querySelector("#empty-addWord");
let windowLoader = document.querySelector("#window-loader");

let spinner = document.querySelector("#spinner-cont");
let spinnerDelete = document.querySelector("#spinner-delete");

let additionForm = document.querySelector("#addition-form");

let homeMain = document.querySelector("#home-main");
let infoMain = document.querySelector("#info-main");
let AddMain = document.querySelector("#add-main");
let listsMain = document.querySelector("#lists-main");
let translatorMain = document.querySelector("#translator-main");
let settingsMain = document.querySelector("#settings-main");

let headMenu = document.querySelector("#head-menu");
let infoAboutMenu = document.querySelector("#infoAbout-menu");
let addMenu = document.querySelector("#add-menu");
let listsMenu = document.querySelector("#lists-menu");
let translatorMenu = document.querySelector("#translator-menu");
let settingsMenu = document.querySelector("#settings-menu");

let settingsOption = document.querySelector("#test-language-select");
let infinityOption = document.querySelector("#infinity-help-select");

let comboDiv = document.querySelector("#combo-div");
let comboNum = document.querySelector("#combo-num");
let comboXG = 0;
let isOne = true;
let baseCha = JSON.parse(localStorage.getItem("bases"));
// DATA'ni Localstorage'ga jo'natish

if (localStorage.getItem("bases") == null) {
  localStorage.setItem("bases", JSON.stringify(data));
}

// RANDOM BG
container.setAttribute(
  "style",
  `background: url('/assets/image/bg${Math.floor(
    // Math.random() * 7
    5
  )}.jpg') no-repeat;
   background-size:cover;
   background-position:center;
  `
);

// OPTION LANGUAGE IDX
localStorage.getItem("languageIdx")
  ? null
  : localStorage.setItem("languageIdx", "all");
settingsOption.value = localStorage.getItem("languageIdx");

// OPTION INFINITY
localStorage.getItem("infinity")
  ? null
  : localStorage.setItem("infinity", "no");
settingsOption.value = localStorage.getItem("infinity") || "no";

mode.textContent = `MODE : ${localStorage
  .getItem("languageIdx")
  .toUpperCase()}`;

const loadWindow = () => {
  setTimeout(() => {
    settingsOption.value = localStorage.getItem("languageIdx");

    windowLoader.classList.add("hide");
  }, Math.floor(Math.random() * 12000));
};
loadWindow();

const renderRandomWord = () => {
  helperDesc.classList.add("hide");
  let languageName = localStorage.getItem("languageIdx");
  mode.textContent = `MODE : ${localStorage
    .getItem("languageIdx")
    .toUpperCase()}`;
  comboXG += 1;
  let languageIdx = 0;
  if (languageName == "all") {
    languageIdx = Math.floor(Math.random() * 2);
  } else if (languageName == "en") {
    languageIdx = 0;
  } else if (languageName == "uz") {
    languageIdx = 1;
  }
  const base = JSON.parse(localStorage.getItem("bases"));
  const dataLength = base.length;
  let dataIdx = Math.floor(Math.random() * dataLength);
  let languageWord = languageIdx ? base[dataIdx].uz : base[dataIdx].en;
  comboNum.textContent = `x ${comboXG}`;

  isOne = true;
  if (comboXG % 7 == 0) {
    container.setAttribute(
      "style",
      `background: url('/assets/image/bg${Math.floor(
        Math.random() * 7
      )}.jpg') no-repeat;
       background-size:cover;
       background-position:center;
      `
    );
  }

  // if (comboXG >= 22) {
  //   helpButton.disabled = false;
  // } else {
  //   helpButton.disabled = true;
  // }

  if (comboXG > 5 && 20 >= comboXG) {
    comboDiv.classList.remove("combo-hide");
  } else if (comboXG > 20 && 35 >= comboXG) {
    comboDiv.setAttribute("style", "background: #943838");
  } else if (comboXG > 35) {
    comboDiv.setAttribute(
      "style",
      "background: #cc2222 ; box-shadow: rgba(241, 6, 6, 0.3) 0px 19px 38px, rgba(241, 6, 6, 0.3) 0px 15px 12px;"
    );
  } else {
    comboDiv.classList.add("combo-hide");
  }

  let gapirUkam = new SpeechSynthesisUtterance(languageWord);
  mainWord.textContent = languageWord.toUpperCase();
  mainWord.dataset.id = languageIdx ? base[dataIdx].en : base[dataIdx].uz;
  !(languageIdx == 0) || speechSynthesis.speak(gapirUkam);

  // SHE'ROZBEK
};
renderRandomWord();

helpButton.addEventListener("click", () => {
  if (isOne) {
    if (localStorage.getItem("infinity") == "yes") {
      mainWord.textContent = mainWord.dataset.id.toUpperCase();
      comboXG = 0;
      isOne = false;
      comboNum.textContent = `x ${comboXG}`;
    } else {
      if (comboXG <= 22) {
        // comboNum.disabled = true;
        helperDesc.classList.remove("hide");
      } else {
        mainWord.textContent = mainWord.dataset.id.toUpperCase();
        comboXG -= 9;
        isOne = false;
        comboNum.textContent = `x ${comboXG}`;
      }
    }
  }
});

nextButton.addEventListener("click", () => renderRandomWord());

showModal.addEventListener("click", () => {
  comboXG = 0;
  modal.classList.remove("modal-hide");
  homeMain.classList.add("hide");
  infoMain.classList.add("hide");
  AddMain.classList.add("hide");
  listsMain.classList.add("hide");
  translatorMain.classList.add("hide");
  settingsMain.classList.add("hide");
});

headMenu.addEventListener("click", () => {
  homeMain.classList.remove("hide");
  modal.classList.add("modal-hide");
  renderRandomWord();
});
infoAboutMenu.addEventListener("click", () => {
  infoMain.classList.remove("hide");
  modal.classList.add("modal-hide");
});
addMenu.addEventListener("click", () => {
  AddMain.classList.remove("hide");
  modal.classList.add("modal-hide");
});
translatorMenu.addEventListener("click", () => {
  translatorMain.classList.remove("hide");
  modal.classList.add("modal-hide");
});
listsMenu.addEventListener("click", () => {
  listsMain.classList.remove("hide");
  modal.classList.add("modal-hide");
  renderListWords();
});
settingsMenu.addEventListener("click", () => {
  settingsMain.classList.remove("hide");
  modal.classList.add("modal-hide");
});

const loaderSpinner = () => {
  spinner.classList.remove("hide");
  spinnerDelete.classList.remove("hide");
  setTimeout(() => {
    spinnerDelete.classList.add("hide");
    spinner.classList.add("hide");
  }, 1500);
};

additionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { uzbek, english } = additionForm.elements;
  let newWord = {
    id: Math.floor(Math.random() * 1000000),
    uz: uzbek.value,
    en: english.value,
  };
  const base = JSON.parse(localStorage.getItem("bases"));
  base.push(newWord);
  localStorage.setItem("bases", JSON.stringify(base));
  uzbek.value = "";
  english.value = "";
  loaderSpinner();
});

function beautyString(str) {
  if (str.length > 18) {
    return `${str.toUpperCase().substring(0, 18)}...`;
  } else {
    return str.toUpperCase();
  }
}
function renderListWords() {
  let Lists = document.querySelector("#lists");
  let base = JSON.parse(localStorage.getItem("bases"));
  Lists.textContent = base.length ? null : undefined;
  if (!base.length) {
    emptyAddWord.classList.remove("hide");
    localStorage.removeItem("bases");
    window.location.assign("/");
  } else {
    emptyAddWord.classList.add("hide");
    base.forEach((item, idx) => {
      let list = document.createElement("div");
      let listLeftSide = document.createElement("div");
      let id = document.createElement("p");
      let listName = document.createElement("p");
      let trash = document.createElement("i");

      list.className = "list";
      listLeftSide.className = "list-left-side";
      id.className = "id";
      listName.className = "list-name";
      trash.className = "fa-solid fa-trash trash";

      trash.dataset.id = idx;

      id.textContent = idx + 1;
      listName.textContent = `${beautyString(item.en)} - ${beautyString(
        item.uz
      )}`;

      listLeftSide.append(id);
      listLeftSide.append(listName);
      list.append(listLeftSide);
      list.append(trash);
      Lists.append(list);

      trash.addEventListener("click", () => deleteList(idx));
    });
  }
}
renderListWords();

function deleteList(id) {
  let base = JSON.parse(localStorage.getItem("bases"));
  base.splice(id, 1);
  loaderSpinner();
  localStorage.setItem("bases", JSON.stringify(base));
  renderListWords();
}
emptyAddWord.addEventListener("click", () => {
  AddMain.classList.remove("hide");
  listsMain.classList.add("hide");
});

infinityOption.addEventListener("change", () => {
  localStorage.setItem("infinity", infinityOption.value);
});

settingsOption.addEventListener("change", () => {
  localStorage.setItem("languageIdx", settingsOption.value);
});
