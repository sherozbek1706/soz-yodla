let mainWord = document.querySelector("#main-word");
let nextButton = document.querySelector("#next-button");
let showModal = document.querySelector("#show-modal");
let modal = document.querySelector("#modal-menu");
let emptyAddWord = document.querySelector("#empty-addWord");

let spinner = document.querySelector("#spinner-cont");
let spinnerDelete = document.querySelector("#spinner-delete");

let additionForm = document.querySelector("#addition-form");

let homeMain = document.querySelector("#home-main");
let infoMain = document.querySelector("#info-main");
let AddMain = document.querySelector("#add-main");
let listsMain = document.querySelector("#lists-main");
let translatorMain = document.querySelector("#translator-main");

let headMenu = document.querySelector("#head-menu");
let infoAboutMenu = document.querySelector("#infoAbout-menu");
let addMenu = document.querySelector("#add-menu");
let listsMenu = document.querySelector("#lists-menu");
let translatorMenu = document.querySelector("#translator-menu");

let baseCha = JSON.parse(localStorage.getItem("bases"));
console.log(baseCha);
// DATA'ni Localstorage'ga jo'natish

console.log(localStorage.getItem("bases"));

if (localStorage.getItem("bases") == null) {
  localStorage.setItem("bases", JSON.stringify(data));
} else {
  console.log("Hammasi yaxshi!");
}

const renderRandomWord = () => {
  const base = JSON.parse(localStorage.getItem("bases"));
  const dataLength = base.length;
  let dataIdx = Math.floor(Math.random() * dataLength);
  let languageIdx = +Math.floor(Math.random() * 2);
  let languageWord = languageIdx ? base[dataIdx].uz : base[dataIdx].en;

  let gapirUkam = new SpeechSynthesisUtterance(languageWord);
  mainWord.textContent = languageWord.toUpperCase();
  !(languageIdx == 0) || speechSynthesis.speak(gapirUkam);

  // SHE'ROZBEK
};
renderRandomWord();

nextButton.addEventListener("click", () => renderRandomWord());

showModal.addEventListener("click", () => {
  modal.classList.remove("modal-hide");
  homeMain.classList.add("hide");
  infoMain.classList.add("hide");
  AddMain.classList.add("hide");
  listsMain.classList.add("hide");
  translatorMain.classList.add("hide");
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
  Lists.textContent = base.length ? null : console.log("Hayrli Tong");
  console.log("betga kirdim oka");
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
  console.log("");
});
