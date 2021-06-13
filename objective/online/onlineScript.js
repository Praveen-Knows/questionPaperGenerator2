let btn = document.querySelector("button");
let chIdx = localStorage.getItem("chIdx"); //contains the index of filenames created
chIdx = JSON.parse(chIdx);
let subject = localStorage.getItem("subject"); //contains the subject name along with classname
let chapter = [];
for (let id of chIdx) {
  chapter.push(`../../objData/${subject + id}.json`);
}
localStorage.setItem("subjects", JSON.stringify(chapter));

btn.addEventListener("click", () => {
  let select = document.querySelector("select");
  if (select.value == "00") {
    alert("Please set duration");
    return;
  }
  localStorage.setItem("duration", select.value);
  location.href = "objective/obj.html";
});
