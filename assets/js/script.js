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
let Warning_text = document.querySelectorAll(".warning-text");

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
let settingsDeleteBtn = document.querySelector(".settings-delete");

let settingsOption = document.querySelector("#test-language-select");
let infinityOption = document.querySelector("#infinity-help-select");
let checkboxOption = document.querySelector("#happy");

let comboDiv = document.querySelector("#combo-div");
let comboNum = document.querySelector("#combo-num");

// VERSION
let appVersion = "3.0.5";

let comboXG = 0;
let isOne = true;
let baseCha = JSON.parse(localStorage.getItem("bases"));
// DATA'ni Localstorage'ga jo'natish

if (localStorage.getItem("bases") == null) {
  localStorage.setItem("bases", JSON.stringify(data));
}

const additionActiveWords = () => {
  const data = JSON.parse(localStorage.getItem("bases"));
  for (let val in data) {
    if (!data[val].active && data[val].active !== false) {
      data.splice(val, 1, {
        id: data[val].id,
        uz: data[val].uz,
        en: data[val].en,
        active: true,
      });
    }
  }
  localStorage.setItem("bases", JSON.stringify(data));
};

additionActiveWords();

// RANDOM BG
container.setAttribute(
  "style",
  `background: url('./assets/image/bg${Math.floor(
    Math.random() * 7
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
infinityOption.value = localStorage.getItem("infinity") || "no";

// CHECKED_OPTION
localStorage.getItem("checkedIS")
  ? null
  : localStorage.setItem("checkedIS", false);
checkboxOption.checked = localStorage.getItem("checkedIS") === "true";

// LOAD WINDOW ---------
const loadWindow = () => {
  setTimeout(() => {
    settingsOption.value = localStorage.getItem("languageIdx");

    windowLoader.classList.add("hide");
  }, Math.floor(Math.random() * 6000));
};
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
loadWindow();

let showedWordsList = [];

const alertMsg = () => {
  let checkedBox = localStorage.getItem("checkedIS");
  if (checkedBox == "true") {
    Warning_text.forEach((warning) => {
      warning.classList.remove("hide");
    });
  } else if (checkedBox == "false") {
    Warning_text.forEach((warning) => {
      warning.classList.add("hide");
    });
  }
};

alertMsg();

const renderRandomWord = () => {
  helperDesc.classList.add("hide");
  let languageName = localStorage.getItem("languageIdx");
  mode.textContent = `MODE : ${localStorage
    .getItem("languageIdx")
    .toUpperCase()} `;

  let version = document.createElement("p");
  version.innerHTML = `v${appVersion}`;
  version.className = "version";
  mode.append(version);
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
  let allow = true;

  let CountFalse = 0;
  for (let i = 0; i < base.length; i++) {
    if (base[i].active === false) {
      CountFalse++;
    }
  }

  while (allow) {
    if (CountFalse === base.length) {
      let haveToTrueElement = {
        id: base[0].id,
        uz: base[0].uz,
        en: base[0].en,
        active: true,
      };
      base.splice(0, 1, haveToTrueElement);
      localStorage.setItem("bases", JSON.stringify(base));
      allow = false;
    }
    let foundWord = showedWordsList.find((word) => word == dataIdx);
    if (!foundWord && foundWord !== 0 && base[dataIdx].active !== false) {
      showedWordsList.push(dataIdx);
      allow = false;
    } else if (base.length - CountFalse == showedWordsList.length) {
      showedWordsList = [];
    } else {
      dataIdx = Math.floor(Math.random() * dataLength);
    }
  }
  let languageWord = languageIdx ? base[dataIdx].uz : base[dataIdx].en;
  comboNum.textContent = `x ${comboXG}`;

  isOne = true;
  if (comboXG % 7 == 0) {
    container.setAttribute(
      "style",
      `background: url('./assets/image/bg${Math.floor(
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
  allow = true;
};
renderRandomWord();

helpButton.addEventListener("click", () => {
  if (isOne) {
    if (localStorage.getItem("infinity") == "yes") {
      showedWordsList = [];
      mainWord.textContent = mainWord.dataset.id.toUpperCase();
      comboXG = 0;
      isOne = false;
      comboNum.textContent = `x ${comboXG}`;
    } else {
      if (comboXG <= 22) {
        // comboNum.disabled = true;
        helperDesc.classList.remove("hide");
      } else {
        showedWordsList = [];
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

  let base = JSON.parse(localStorage.getItem("bases"));

  let CountFalse = 0;
  for (let i = 0; i < base.length; i++) {
    if (base[i].active === false) {
      CountFalse++;
    }
  }
  alertMsg();
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
  }, 1000);
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
  additionActiveWords();
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
      let listsOptions = document.createElement("div");

      let trash = document.createElement("i");
      let cross = document.createElement("i");
      let disabled = document.createElement("i");
      let dots = document.createElement("i");

      list.className = "list";
      listLeftSide.className = "list-left-side";
      id.className = "id";
      listsOptions.className = "lists-options";
      listName.className = "list-name";
      // trash.className = "fa-solid fa-trash trash";

      // <i class="fa-solid fa-ellipsis"></i>

      trash.className = "fa-regular fa-trash-can trash hide";
      // <i class="fa-regular fa-trash-can"></i>
      dots.className = "fa-solid fa-ellipsis dots-bar hide";
      disabled.className = `fa-solid fa-square-minus disabledBtn ${
        base[idx].active ? "activeBtn" : "disactiveBtn"
      } hide`;

      cross.className = "fa-solid fa-circle-xmark cross-option hide";
      // <i class="fa-solid fa-circle-xmark"></i>

      trash.dataset.id = idx;
      disabled.dataset.id = idx;

      id.textContent = idx + 1;
      listName.textContent = `${beautyString(item.en)} - ${beautyString(
        item.uz
      )}`;

      listLeftSide.append(id);
      listLeftSide.append(listName);
      list.append(listLeftSide);

      // APPEND TRASH
      listsOptions.append(trash);

      // APPEND DOTS
      // list.append(dots);

      // APPEND disabled
      listsOptions.append(disabled);

      // APPEND cross
      // listsOptions.append(cross);

      list.append(listsOptions);
      Lists.append(list);

      trash.addEventListener("click", () => deleteList(idx));
      disabled.addEventListener("click", () => disabledBtnList(idx));
    });
  }
}
renderListWords();

settingsDeleteBtn.addEventListener("click", () => {
  let DoYouReallyDeleteWords = confirm(
    "Do you really want to delete all words ?"
  );
  if (DoYouReallyDeleteWords) {
    localStorage.removeItem("bases");
    window.location.assign("/");
  }
});

function deleteList(id) {
  let base = JSON.parse(localStorage.getItem("bases"));
  base.splice(id, 1);
  loaderSpinner();
  localStorage.setItem("bases", JSON.stringify(base));
  renderListWords();
}

function disabledBtnList(id) {
  let base = JSON.parse(localStorage.getItem("bases"));
  base.splice(id, 1, {
    id: base[id].id,
    uz: base[id].uz,
    en: base[id].en,
    active: !base[id].active,
  });
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

checkboxOption.addEventListener("change", () => {
  localStorage.setItem("checkedIS", checkboxOption.checked);

  // const data = JSON.parse(localStorage.getItem("bases"));
  // for (let val in data) {
  //   if (!data[val].active && data[val].active !== false) {
  //     data.splice(val, 1, {
  //       id: data[val].id,
  //       uz: data[val].uz,
  //       en: data[val].en,
  //       active: true,
  //     });
  //   }
  // }

  if (checkboxOption.checked) {
    localStorage.setItem(
      "disBase",
      JSON.stringify(JSON.parse(localStorage.getItem("bases")))
    );

    const data = JSON.parse(localStorage.getItem("bases"));
    for (let val in data) {
      if (!data[val].active) {
        data.splice(val, 1, {
          id: data[val].id,
          uz: data[val].uz,
          en: data[val].en,
          active: true,
        });
      }
    }

    localStorage.setItem("bases", JSON.stringify(data));
  } else if (checkboxOption.checked == false) {
    localStorage.setItem(
      "bases",
      JSON.stringify(JSON.parse(localStorage.getItem("disBase")))
    );
  }
});
