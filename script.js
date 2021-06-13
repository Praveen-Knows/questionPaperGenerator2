"use strict";
function objective() {
  console.log("Clicked Objective");
  localStorage.setItem("type", "OBJECTIVE");
  document.getElementById("objective").style.display = "block";
  document.getElementById("subjective").style.display = "none";
  document.getElementById("class9").style.display = "none";
  document.getElementById("class10").style.display = "none";
  document.getElementById("class11").style.display = "none";
  document.getElementById("class12").style.display = "none";
  window.scrollBy(0, 300);
}
function subjective() {
  console.log("Clicked Subjective");
  localStorage.setItem("type", "SUBJECTIVE");
  document.getElementById("subjective").style.display = "block";
  document.getElementById("objective").style.display = "none";
  document.getElementById("class9").style.display = "none";
  document.getElementById("class10").style.display = "none";
  document.getElementById("class11").style.display = "none";
  document.getElementById("class12").style.display = "none";
  window.scrollBy(0, 300);
}
function sectionName(classVal) {
  let str = "class" + classVal;
  console.log("Clicked " + str);
  document.getElementById(str).style.display = "block";
  document.getElementById("objective").style.display = "none";
  document.getElementById("subjective").style.display = "none";
  let subID = "#subject" + classVal;
  let subject = document.querySelectorAll(subID);
  for (let subs of subject) {
    subs.addEventListener("click", () => {
      localStorage.setItem("subject", str + subs.innerText);
      localStorage.setItem("className", classVal);
    });
  }
  window.scrollBy(0, 300);
}
