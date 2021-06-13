/*-----------Adding EventListener on plus icon to allow user to add own questions------------ */
let plus = document.querySelector(".plus");
plus.addEventListener("click", () => {
  let ownMarker = document.querySelector("#ownMarker");
  let subBlock = document.createElement("div"); //creating container block for question,marks and icon
  let inputqs = document.createElement("input"); //creating input block for questions
  let inputmrk = document.createElement("input"); //creating input block for marks
  let icon = document.createElement("i"); //creating close icon
  subBlock.setAttribute("class", "sub-block");
  inputqs.id = "addqs";
  inputqs.type = "text";
  inputqs.placeholder = "QUESTION";
  inputmrk.id = "addmrk";
  inputmrk.type = "text";
  inputmrk.placeholder = "MARK";
  icon.setAttribute("class", "far fa-times-circle close");
  subBlock.appendChild(inputqs);
  subBlock.appendChild(inputmrk);
  subBlock.appendChild(icon);
  ownMarker.appendChild(subBlock);
  /*--Adding EventListener on close icon to remove subBlock ie container block--*/
  icon.addEventListener("click", () => {
    subBlock.remove();
  });
  /*--------------------------------------XX------------------------------------*/
});
/*--------------------------------------------XXX--------------------------------------------*/

/*-------------------------Creating file names according to user input---------------------- */
let chIdx = localStorage.getItem("chIdx"); //contains the index of filenames created
chIdx = JSON.parse(chIdx);
let subject = localStorage.getItem("subject"); //contains the subject name along with classname
let chapter = [];
for (let id of chIdx) {
  chapter.push(`../subjData/${subject + id}.json`);
}
/*--------------------------------------------XXX--------------------------------------------*/

/*-------------------------Fetching data according to created file names---------------------*/
let idx = 0;
let markOne = []; //contains questions according to marks
let markTwo = [];
let markThree = [];
let markFour = [];
dataHandler();
async function getData(file) {
  let response = await fetch(file);
  if (response.status !== 200) {
    idx++;
    dataHandler();
    return new Error("File Not Found");
  }
  const data = await response.json();
  idx++;
  dataHandler();
  return data;
}
function dataHandler() {
  if (idx < chapter.length) {
    getData(chapter[idx])
      .then((data) => {
        for (let mark in data) {
          if (mark == 0) {
            markOne.push(data[0]);
          } else if (mark == 1) {
            markTwo.push(data[1]);
          } else if (mark == 2) {
            markThree.push(data[2]);
          } else {
            markFour.push(data[3]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setTimeout(addQuestion, 10);
  }
}
/*--------------------------------------------XXX--------------------------------------------*/

/*---------------------------------Adding questions in DOM---------------------------------- */
function addQuestion() {
  let oneMarker = document.querySelector("#oneMarker");
  let twoMarker = document.querySelector("#twoMarker");
  let threeMarker = document.querySelector("#threeMarker");
  let FourMarker = document.querySelector("#fourMarker");
  passQuestion(oneMarker, markOne, 1);
  passQuestion(twoMarker, markTwo, 2);
  passQuestion(threeMarker, markThree, 3);
  passQuestion(FourMarker, markFour, 4);
}
function passQuestion(nthMarker, markNum, num) {
  for (let i = 0; i < markNum.length; i++) {
    for (let obj in markNum[i]) {
      let br = document.createElement("br");
      if (obj == "chapter") {
        let h = document.createElement("h3");
        h.innerText = markNum[i][obj];
        nthMarker.appendChild(h);
      } else if (obj == "img") {
        let img = document.createElement("img");
        img.src = markNum[i][obj];
        nthMarker.appendChild(img);
        nthMarker.appendChild(br);
      } else {
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "checkbox";
        input.setAttribute("mark", num);
        input.setAttribute("class", "checktype");
        input.id = obj;
        label.setAttribute("for", obj);
        label.innerText = markNum[i][obj];
        nthMarker.appendChild(input);
        nthMarker.appendChild(label);
        nthMarker.appendChild(br);
      }
    }
  }
}
/*--------------------------------------------XXX--------------------------------------------*/

/*----------------------------------Reading user Input-------------------------------------- */
/*------------Adding EventListener on submit button---------------*/
let submit = document.querySelector("#submit");
let qsMarkWise = []; //Creating array to store selected question paper
for (let i = 0; i < 4; i++) {
  qsMarkWise[i] = [];
}
console.log(qsMarkWise);
submit.addEventListener("click", () => {
  /*-------------------Getting data from checkbox-----------------*/
  let inputAll = document.querySelectorAll(".checktype");
  let labelAll = document.querySelectorAll("label");
  for (id in inputAll) {
    if (inputAll[id].checked == true) {
      let mark = inputAll[id].getAttribute("mark");
      qsMarkWise[mark - 1].push(labelAll[id].innerText);
    }
  }
  /*-------------------Getting data from textbox-------------------*/
  let textqs = document.querySelectorAll("#addqs");
  let textmark = document.querySelectorAll("#addmrk");
  for (id in textqs) {
    if (textqs[id].value == "" && textmark[id].value != "") {
      textqs[id].style.border = "2px solid red";
      alert("please add question");
      qsMarkWise[0].splice(0, qsMarkWise[0].length);
      qsMarkWise[1].splice(0, qsMarkWise[1].length);
      qsMarkWise[2].splice(0, qsMarkWise[2].length);
      qsMarkWise[3].splice(0, qsMarkWise[3].length);
      break;
    } else if (textqs[id].value != "" && textmark[id].value == "") {
      textmark[id].style.border = "2px solid red";
      alert("please input marks");
      qsMarkWise[0].splice(0, qsMarkWise[0].length);
      qsMarkWise[1].splice(0, qsMarkWise[1].length);
      qsMarkWise[2].splice(0, qsMarkWise[2].length);
      qsMarkWise[3].splice(0, qsMarkWise[3].length);
      break;
    } else if (textqs[id].value != "" && textmark[id].value != "") {
      if (textmark[id].value <= 4) {
        qsMarkWise[textmark[id].value - 1].push(textqs[id].value);
      }
    }
  }
  console.log(qsMarkWise);
  qsMarkWise = JSON.stringify(qsMarkWise);
  localStorage.setItem("qsMarkWise", qsMarkWise);
  console.log(qsMarkWise);
});
