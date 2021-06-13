/*-----------Adding EventListener on plus icon to allow user to add own questions------------ */
let plus = document.querySelector(".plus");
plus.addEventListener("click", () => {
  let ownMarker = document.querySelector("#ownMarker");
  let subBlock = document.createElement("div"); //creating container block for question,marks and icon
  let inputqs = document.createElement("input"); //creating input block for questions
  let inputA = document.createElement("input");
  let inputB = document.createElement("input");
  let inputC = document.createElement("input");
  let inputD = document.createElement("input");
  let inputAns = document.createElement("input");
  let icon = document.createElement("i"); //creating close icon
  subBlock.setAttribute("class", "sub-block");
  inputqs.id = "addqs";
  inputqs.type = "text";
  inputqs.placeholder = "QUESTION";
  inputA.id = "optionA";
  inputA.type = "text";
  inputA.placeholder = "A";
  inputB.id = "optionB";
  inputB.type = "text";
  inputB.placeholder = "B";
  inputC.id = "optionC";
  inputC.type = "text";
  inputC.placeholder = "C";
  inputD.id = "optionD";
  inputD.type = "text";
  inputD.placeholder = "D";
  inputAns.id = "ans";
  inputAns.type = "text";
  inputAns.placeholder = "Answer";
  icon.setAttribute("class", "far fa-times-circle close");
  subBlock.appendChild(inputqs);
  subBlock.appendChild(icon);
  subBlock.appendChild(inputA);
  subBlock.appendChild(inputB);
  subBlock.appendChild(inputC);
  subBlock.appendChild(inputD);
  subBlock.appendChild(inputAns);
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
  chapter.push(`../objData/${subject + id}.json`);
}
console.log(chapter);
/*--------------------------------------------XXX--------------------------------------------*/

/*-------------------------Fetching data according to created file names---------------------*/
let idx = 0;
let markOne = []; //contains questions according to marks
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
        for (let objId = 0; objId < data.length; objId++) {
          markOne.push(data[objId]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setTimeout(AddQsInDom, 10);
  }
}
/*--------------------------------------------XXX--------------------------------------------*/

/*---------------------------------Adding questions in DOM---------------------------------- */
let answerKey = [];
function AddQsInDom() {
  let oneMarker = document.querySelector("#oneMarker");
  for (let idx = 0; idx < markOne.length; idx++) {
    for (obj in markOne[idx]) {
      let br = document.createElement("br");
      if (obj == "chapter") {
        let h = document.createElement("h3");
        h.innerText = markOne[idx][obj];
        oneMarker.appendChild(h);
      } else if (obj == "question") {
        let input = document.createElement("input");
        let label = document.createElement("label");
        input.type = "checkbox";
        input.setAttribute("index", idx);
        input.setAttribute("class", "checktype");
        input.id = idx;
        label.setAttribute("for", idx);
        label.innerText = markOne[idx][obj];
        oneMarker.appendChild(input);
        oneMarker.appendChild(label);
        oneMarker.appendChild(br);
      } else if (obj == "ans") {
        answerKey.push(markOne[idx][obj]);
      } else {
        let p = document.createElement("p");
        p.innerText = obj + ")" + markOne[idx][obj];
        oneMarker.appendChild(p);
      }
    }
  }
}
/*--------------------------------------------XXX--------------------------------------------*/

/*----------------------------------Reading user Input-------------------------------------- */
/*------------Adding EventListener on submit button---------------*/
let submit = document.querySelector("#submit");
let qsMarkWise = []; //Creating array to store selected question paper
console.log(qsMarkWise);
submit.addEventListener("click", () => {
  /*-------------------Getting data from checkbox-----------------*/
  let inputAll = document.querySelectorAll(".checktype");
  for (idx in inputAll) {
    if (inputAll[idx].checked == true) {
      let id = inputAll[idx].getAttribute("index");
      qsMarkWise.push(markOne[id]);
    }
  }
  // console.log(qsMarkWise);
  /*-------------------Getting data from textbox-------------------*/
  let qsnInput = document.querySelectorAll("#addqs");
  console.log(qsnInput);
  let optionA = document.querySelectorAll("#optionA");
  let optionB = document.querySelectorAll("#optionB");
  let optionC = document.querySelectorAll("#optionC");
  let optionD = document.querySelectorAll("#optionD");
  let ans = document.querySelectorAll("#ans");
  let count = 0;
  for (input of qsnInput) {
    let obj = {};
    if (input.value == "") {
      input.style.border = "2px solid red";
      alert("please add question");
      break;
    } else {
      obj["question"] = input.value;
      obj["A"] = optionA[count].value;
      obj["B"] = optionB[count].value;
      obj["C"] = optionC[count].value;
      obj["D"] = optionD[count].value;
      answerKey.push(ans[idx]);
    }
    qsMarkWise.push(obj);
    count++;
  }
  console.log(qsMarkWise);
  qsMarkWise = JSON.stringify(qsMarkWise);
  localStorage.setItem("qsMarkWise", qsMarkWise);
});
