/*-------------------------------------Adding Timer------------------------------------------ */
let durationInSec = Number(localStorage.getItem("duration")) * 60;
startTime();
function startTime() {
  let timer = document.querySelector(".timer");
  let duration = durationInSec;
  let count = 0;
  for (let i = 0; i < durationInSec; i++) {
    duration--;
    processTime(timer, count, duration);
    count++;
  }
}
function processTime(timer, count, duration) {
  setTimeout(() => {
    let hour = Math.floor(duration / 3600);
    if (hour < 10) {
      hour = "0" + hour;
    } else if (hour == 0) {
      hour = "00";
    }
    let min = Math.floor((duration - hour * 3600) / 60);
    if (min < 10) {
      min = "0" + min;
    } else if (min == 0) {
      min = "00";
    }
    let sec = duration - hour * 3600 - min * 60;
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (duration == 0) {
      endTest();
    }
    timer.innerText = hour + ":" + min + ":" + sec;
  }, 1000 * count);
}
/*------------------------------------------xxx-----------------------------------------------*/

/*------------------------------------Adding user media---------------------------------------*/
let videoPlayer = document.querySelector("video");
//   let audioPlayer = document.querySelector("audio");
let constraints = { video: true };
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (mediaStream) {
    //   audioPlayer.srcObject = mediaStream; //takes mediaStream as source and passes its source to audioplayer
    videoPlayer.srcObject = mediaStream;
  })
  .catch(function (err) {
    console.log(err);
  });
/*----------------------------------------------xxx-------------------------------------------*/

/*-----------------------------------------Reading JSON files---------------------------------*/
let subjects = JSON.parse(localStorage.getItem("subjects"));
let noOfQuestions = (2 * (durationInSec / 60)) / 3; //Formula for noOfQuestions
let qes = Math.ceil(noOfQuestions / subjects.length); //qes = Question in each section
noOfQuestions = qes * subjects.length;
async function getData(file) {
  let response = await fetch(file);
  if (response.status !== 200) {
    return new Error("File Not Found!");
  }
  let data = await response.json();
  return data;
}
let questionList = [];
let chName = [];
for (let i = 0; i < subjects.length; i++) {
  let questionnaire = []; //Contains all the questions of each subject
  getData(subjects[i])
    .then((data) => {
      let idx = 0;
      let obj = {};
      while (idx < qes) {
        let random = Math.ceil(Math.random() * data.length);
        if (obj[random] === undefined) {
          questionnaire.push(data[random - 1]);
          obj[random - 1] = true;
          idx++;
        }
      }
      //updates the total questions list
      for (let qid = 0; qid < questionnaire.length; qid++) {
        if (questionnaire[qid]["chapter"] == undefined) {
          questionList.push(questionnaire[qid]);
        } else {
          console.log(questionnaire[qid]["chapter"]);
          chName.push(questionnaire[qid]["chapter"]);
        }
      }
      if (i == subjects.length - 1) {
        showQuestions(questionList);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
setTimeout(() => {
  console.log(chName);
}, 1000);
/*-----------------------------------------XXX-----------------------------------------------*/

/*----------------------------------Displaying question--------------------------------------*/
let count = 0; //Determines the current question which is being viewed
let answerKey = new Array(noOfQuestions);
let userAnswers = new Array(noOfQuestions);
function showQuestions(questionList) {
  generateAnswerKey(questionList);
  let qsHead = document.querySelector("#qs");
  let option = document.querySelectorAll("label");
  let radioInput = document.querySelectorAll("input");
  let obj = { ...questionList[count] };
  for (items in obj) {
    if (items == "A") {
      option[0].innerText = obj["A"];
      radioInput[0].checked = false;
    } else if (items == "B") {
      option[1].innerText = obj["B"];
      radioInput[1].checked = false;
    } else if (items == "C") {
      option[2].innerText = obj["C"];
      radioInput[2].checked = false;
    } else if (items == "D") {
      option[3].innerText = obj["D"];
      radioInput[3].checked = false;
    } else if (items == "ans") {
      //do nothing
    } else qsHead.innerText = count + 1 + "." + obj[items];
  }
  if (userAnswers[count] != undefined) {
    let ansVal = userAnswers[count - 1];
    if (ansVal == "A") {
      radioInput[0].checked = true;
    } else if (ansVal == "B") {
      radioInput[1].checked = true;
    } else if (ansVal == "C") {
      radioInput[2].checked = true;
    } else {
      radioInput[3].checked = true;
    }
  }
}
function generateAnswerKey(questionList) {
  for (let i = 0; i < questionList.length; i++) {
    answerKey[i] = questionList[i]["ans"];
  }
}
/*----------------------------------------------XXX--------------------------------------------*/

/*-------------------------------Handling next and previous button----------------------------*/
let nextbtn = document.querySelector(".next-btn"); //Handling Next button
nextbtn.addEventListener("click", () => {
  count++;
  if (count == questionList.length) {
    updateIcon(count);
    alert("Already on Last Question");
    count--;
    return;
  }
  updateIcon(count);
  showQuestions(questionList);
});
let prevbtn = document.querySelector(".prev-btn"); //"Handling Previous Button"
prevbtn.addEventListener("click", () => {
  count--;
  if (count == -1) {
    alert("Already on First Question");
    count++;
    return;
  }
  showQuestions(questionList);
});
/*-------------------------------------------XXX-------------------------------------------- */
function updateIcon(cnt) {
  //Updating icon and answer as entered by user
  let opt = document.querySelectorAll("input");
  for (let optid = 0; optid < opt.length; optid++) {
    if (opt[optid].checked == true) {
      if (optid == 0) {
        userAnswers[cnt - 1] = "A";
      } else if (optid == 1) {
        userAnswers[cnt - 1] = "B";
      } else if (optid == 2) {
        userAnswers[cnt - 1] = "C";
      } else {
        userAnswers[cnt - 1] = "D";
      }
      let ico = document.querySelectorAll("i");
      ico[cnt - 1].className = "fas fa-check-square";
    }
  }
}
/*-------------------------------------Adding Sidbar Icons---------------------------------- */
let sidebar = document.querySelector(".sidebar");
for (let idx = 0; idx < subjects.length; idx++) {
  let div = document.createElement("div");
  div.className = "sub-block";
  let h3 = document.createElement("h3");
  h3.innerText = "Section" + " : " + (idx + 1);
  sidebar.appendChild(h3);
  for (let j = 0; j < qes; j++) {
    let icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-square");
    icon.addEventListener("click", () => {
      count = j + idx * qes;
      showQuestions(questionList);
    });
    div.appendChild(icon);
  }
  sidebar.appendChild(div);
}
/*-------------------------------------------XXX----------------------------------------------*/

/*------------------------------------------End Test------------------------------------------*/
let endBtn = document.querySelector(".end-btn");
endBtn.addEventListener("click", endTest);
function endTest() {
  let score = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] == answerKey[i]) {
      score++;
    }
  }
  alert(`You have scored ${score} out of ${userAnswers.length}`);
  location.href = "thankPage.html";
}
/*--------------------------------------------xxx---------------------------------------------*/
