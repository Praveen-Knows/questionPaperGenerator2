let heading = document.querySelector("#exam-type");
let examType = localStorage.getItem("type"); //GETTING EXAM-TYPE STORED IN LOCALSTORAGE

heading.innerText = examType; //ADDING EXAM TYPE HEADING (SUBJECTIVE OR OBJECTIVE)
let plus = document.querySelectorAll(".plus");
let sCount = 0,
  iCount = 0;

/*-------------------------ADDING EXAM MODE FOR OBJECTIVE----------------------- */
if (examType == "OBJECTIVE") {
  let textField = document.querySelector(".input-text");
  let label = document.createElement("label");
  label.innerText = "Exam Mode: ";
  label.setAttribute("for", "exam-mode");
  textField.appendChild(document.createElement("br"));
  textField.appendChild(document.createElement("br"));
  textField.appendChild(document.createElement("br"));
  textField.appendChild(label);
  let select = document.createElement("select");
  select.innerHTML = "<option>ONLINE</option><option>OFFLINE</option>";
  textField.appendChild(select);
}

/*---------------ADDING EVENTLISTENER ON PLUS[0] ICON AT ADD SECTIONS-------------- */
plus[0].addEventListener("click", () => {
  let inpt = document.createElement("input");
  inpt.type = "text";
  inpt.placeholder = "Name Of Section";
  inpt.style.width = "65%";
  inpt.className = "plus-sect";
  let mrkinpt = document.createElement("input");
  mrkinpt.placeholder = "Marks";
  mrkinpt.type = "text";
  mrkinpt.style.width = "20%";
  mrkinpt.className = "plus-sect";
  let pos = document.querySelector(".add-sections");
  sCount++;
  if (sCount == 5) {
    pos.style.height = "33%";
    pos.style.overflowY = "scroll";
  }
  let icon = document.createElement("i");
  icon.setAttribute("class", "far fa-times-circle close-sect");
  let subBlock = document.createElement("div");
  subBlock.setAttribute("class", "section-detail");
  subBlock.appendChild(inpt);
  subBlock.appendChild(mrkinpt);
  subBlock.appendChild(icon);
  pos.appendChild(subBlock);
  /*------ADDING EVENTLISTENER ON CLOSE ICON IN ADD SECTIONS------*/
  icon.addEventListener("click", () => {
    subBlock.remove();
    sCount--;
    if (sCount < 5) {
      pos.style.height = "auto";
    }
  });
});

/*--------------ADDING EVENTLISTENER ON PLUS[1] ICON AT ADD INSTRUCTIONS------------ */
plus[1].addEventListener("click", () => {
  let inpt = document.createElement("input");
  inpt.type = "text";
  inpt.className = "plus-inst";
  inpt.placeholder = "Add Instruction Here";
  inpt.style.width = "90%";
  let pos = document.querySelector(".add-instructions");
  iCount++;
  if (iCount == 5) {
    pos.style.height = "33%";
    pos.style.overflowY = "scroll";
  }
  let icon = document.createElement("i");
  icon.setAttribute("class", "far fa-times-circle close-inst");
  pos.appendChild(inpt);
  pos.appendChild(icon);
  let cls = document.querySelectorAll(".close-inst");
  /*------ADDING EVENTLISTENER ON CLOSE ICON IN ADD INSTRUCTIONS------*/
  icon.addEventListener("click", () => {
    inpt.remove();
    icon.remove();
    iCount--;
    if (iCount < 5) {
      pos.style.height = "auto";
    }
  });
});

/*------------------------------------Collecting data------------------------------*/
let submit = document.querySelector(".sub-btn");
submit.addEventListener("click", () => {
  /*------Getting data from input-text field----*/
  let examHeader = [];
  let orgDetail = document.querySelector("#Organisation");
  let examName = document.querySelector("#ExamName");
  let examDuration = document.querySelector("#Duration");
  let examMM = document.querySelector("#Marks");
  examHeader.push(orgDetail.value);
  examHeader.push(examName.value);
  examHeader.push(examDuration.value);
  examHeader.push(examMM.value);
  console.log(examHeader);
  localStorage.setItem("examHeader", JSON.stringify(examHeader));
  /*-------Getting data from add-section field -----*/
  let sectionDetail = [];
  let examSection = document.querySelectorAll(".plus-sect");
  for (let sect = 0; sect < examSection.length; sect++) {
    let sectionMark = examSection[sect + 1].value;
    let sectionN = examSection[sect].value;
    let obj = {};
    obj[sectionMark] = sectionN;
    sectionDetail.push(obj);
    sect++;
  }
  console.log(sectionDetail);
  localStorage.setItem("sectionDetail", JSON.stringify(sectionDetail));
  /*---Getting data from add-instructions field-----*/
  let instDetail = [];
  let examInst = document.querySelectorAll(".plus-inst");
  for (let inst of examInst) {
    instDetail.push(inst.value);
  }
  localStorage.setItem("instDetail", JSON.stringify(instDetail));
  console.log(instDetail);
  /*---Checking Exam mode only for objective type---*/
  if (examType == "OBJECTIVE") {
    let examMode = document.querySelector("select");
    console.log(examMode.value);
    if (examMode.value == "ONLINE") {
      location.href = "../../objective/online/onlineIndex.html";
    } else {
      location.href = "../../objective/offline/questionBank.html";
    }
    // localStorage.setItem("examMode", examMode);
  } else {
    location.href = "../../subjective/question/questionBank.html";
  }
});
