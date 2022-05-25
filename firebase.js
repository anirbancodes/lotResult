import {
  getDoc,
  doc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { fc } from "/c.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
const app = initializeApp(fc);
const db = getFirestore(app);

//import { fetchTime } from "./index.js";

//displayTime();
// async function displayTime() {
//   await fetchTime();
//   document.getElementById("time-counter").innerHTML = time;
// }

async function saleTbody(date) {
  if (!date) {
    let now = new Date();
    let date1 =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    date = date1;
  }
  const ref = doc(db, "result", date);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const result = docSnap.data();

    document.getElementById("sale-tbody").innerHTML = `<li class="table-header">
            <div class="col">Time</div>
            <div class="col">Lucky Number</div>
          </li>`;

    let keys = Object.keys(result);
    keys.forEach((dtime) => {
      document.getElementById("sale-tbody").innerHTML +=
        `<li class="table-row">
      <div class="col">` +
        dtime +
        `</div>
      <div class="col" >` +
        result[dtime] +
        `</div>
    </li>`;
    });
  } else {
    alert("No games played");
  }
}
saleTbody();
const showBtn = document.getElementById("showBtn");
showBtn.addEventListener("click", () => {
  let date = document.getElementById("date").value;
  let i1 = date.indexOf("-"),
    i2 = date.lastIndexOf("-");
  date =
    date.substring(0, i1 + 1) +
    (Number(date.substring(i1 + 1, i2)) / 10) * 10 +
    "-" +
    (Number(date.substring(i2 + 1, i2 + 3)) / 10) * 10;
  console.log(date);
  saleTbody(date);
});
