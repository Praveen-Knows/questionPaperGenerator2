chapterFile = localStorage.getItem("chapterFile");
chapterFile = "../chapterData/" + chapterFile + ".json";
clsName = localStorage.getItem("className");
console.log(chapterFile);
console.log(clsName);
let nameofCls = document.querySelector("#class-name");
nameofCls.innerText = "Class - " + clsName;

readTextFile(chapterFile, addChapters);
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
function addChapters(chapters) {
  chapters = JSON.parse(chapters);
  console.log(chapters);
  let div = document.querySelector(".chapter-list");
  for (let idx in chapters) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", idx);
    label.setAttribute("for", idx);
    label.innerText = chapters[idx];
    let br = document.createElement("br");
    label.setAttribute("id", "label" + idx);
    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(br);
  }
  let submit = document.querySelector("#submit-btn");
  console.log(submit);
  submit.addEventListener("click", () => {
    let chName = [];
    let chIdx = [];
    input = document.querySelectorAll("input");
    for (let idx in input) {
      if (input[idx].checked == true) {
        chName.push(document.querySelector(`#label${idx}`).innerText);
        chIdx.push(Number(idx) + 1);
      }
    }
    if (chName.length == 0) {
      alert("Please Select Atleast One Chapter");
    } else {
      localStorage.setItem("chName", JSON.stringify(chName));
      localStorage.setItem("chIdx", JSON.stringify(chIdx));
      location.href = "../details/detailsPage.html";
    }
  });
}
