let data = localStorage.getItem("qsMarkWise");
data = JSON.parse(data);
console.log(data);
showPaper();
function showPaper() {
  /**************************Creating the Test Detail block***************************/
  let testDetail = document.querySelector(".testDetails");
  let dataArr = localStorage.getItem("examHeader");
  console.log(dataArr);
  dataArr = JSON.parse(dataArr);
  //Name of Organisation
  let nodeO = document.createElement("p");
  nodeO.innerText = dataArr[0];
  nodeO.style.textAlign = "center";
  nodeO.style.fontSize = "1.5rem";
  console.log(nodeO);
  testDetail.appendChild(nodeO);
  //Name of Examination
  let nodeE = document.createElement("p");
  nodeE.innerText = dataArr[1];
  nodeE.style.textAlign = "center";
  nodeE.style.fontSize = "1.3rem";
  testDetail.appendChild(nodeE);
  //Test Duration
  let nodeD = document.createElement("span");
  nodeD.innerText = "Duration: " + Number(dataArr[2]) / 60 + " hrs";
  nodeD.style.fontSize = "1.2rem";
  nodeD.style.display = "inline-block";
  testDetail.appendChild(nodeD);
  //Test Maximum Marks
  let nodeM = document.createElement("span");
  nodeM.innerText = "MM:" + dataArr[3];
  nodeM.style.fontSize = "1.2rem";
  nodeM.style.display = "inline-block";
  nodeM.style.float = "right";
  testDetail.appendChild(nodeM);

  /********************************Instruction Block********************************/
  let instDetail = JSON.parse(localStorage.getItem("instDetail"));
  console.log(instDetail);
  let Instruction = document.querySelector(".instructions");
  //Instructions
  Instruction.appendChild(document.createElement("hr"));
  for (str of instDetail) {
    let inx = document.createElement("li");
    inx.innerText = str;
    Instruction.appendChild(inx);
  }
  Instruction.style.fontSize = "1.2rem";
  Instruction.appendChild(document.createElement("hr"));
  //Showing Questions

  /**********************************Questions Block**********************************/
  let sectionDetail = JSON.parse(localStorage.getItem("sectionDetail"));
  console.log(sectionDetail);
  let Questions = document.querySelector("ol");
  for (let i = 0; i < data.length; i++) {
    if (sectionDetail[i] != undefined) {
      let sd = document.createElement("p");
      sd.innerText = sectionDetail[i][i + 1];
      sd.style.textAlign = "center";
      sd.style.fontWeight = "bold";
      sd.style.fontSize = "1.2rem";
      // sd.style = "page-break-before: always";
      Questions.appendChild(sd);
    }
    for (let j = 0; j < data[i].length; j++) {
      let nodeQ = document.createElement("li");
      nodeQ.innerText = data[i][j];
      Questions.appendChild(nodeQ);
      Questions.appendChild(document.createElement("br"));
    }
  }
}
// localStorage.removeItem("instDetail");
// localStorage.removeItem("sectionDetail");
// localStorage.removeItem("examHeader");
// localStorage.removeItem("qsMarkWise");
