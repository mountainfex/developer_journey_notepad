let titles = [];
let descriptions = [];
load();

function opennotepad() {
  document.getElementById("notepad").classList.remove("dnone");

  title.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("description").focus();
    }
  });
  description.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("savebutton").click();
    }
  });
}

function closenotepad() {
  document.getElementById("notepad").classList.add("dnone");
}

function checknote() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  if (title.value === "" || description.value === "") {
    shakeElement();
  } else {
    addnote();
    closenotepad();
  }
}

function shakeElement() {
  let element = document.getElementById("notepad");
  element.classList.add("shake");
  setTimeout(function () {
    element.classList.remove("shake");
  }, 1000);
}

function newnote() {
  let note = document.getElementById("note");
  note.innerHTML = "";
  for (let i = 0; i < titles.length; i++) {
    note.innerHTML += generateNewNoteHTML(i);
  }
}

function generateNewNoteHTML(i) {
  const title = titles[i];
  const description = descriptions[i];
  return html`
    <div class="detailsframe">
    <div class="contain" >
      <p id="edittitle" contenteditable="true">${titles[i]}</p>
        <span id="editdescription" contenteditable="true">${descriptions[i]}</span>
    </div>
    <div class="button">
      <button class="btndelete" onclick="deletenote(${i})">DELETE</button>
    </div>
  </div>`;
}

function addnote() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  titles.push(title.value);
  descriptions.push(description.value);

  newnote();
  save();
}

function deletenote(i) {
  titles.splice(i, 1);
  descriptions.splice(i, 1);
  newnote();
  save();
}

function save() {
  let titlesAsText = JSON.stringify(titles);
  localStorage.setItem("titles", titlesAsText);
  let descriptionsAsText = JSON.stringify(descriptions);
  localStorage.setItem("descriptions", descriptionsAsText);
}

function load() {
  let titlesAsText = localStorage.getItem("titles");
  let descriptionsAsText = localStorage.getItem("descriptions");
  if (titlesAsText && descriptionsAsText) {
    titles = JSON.parse(titlesAsText);
    descriptions = JSON.parse(descriptionsAsText);
  }
}
