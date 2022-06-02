import {
  getDoc,
  doc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { fc } from "/c.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
const app = initializeApp(fc);
const db = getFirestore(app);
import { fetchTime } from "./time.js";

//import { fetchTime } from "./index.js";

//displayTime();
// async function displayTime() {
//   await fetchTime();
//   document.getElementById("time-counter").innerHTML = time;
// }

const dtimes = [
  "9:0 AM",
  "9:15 AM",
  "9:30 AM",
  "9:45 AM",
  "10:0 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:0 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:0 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:0 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:0 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:0 PM",
  "3:15 PM",
  "3:30 PM",
  "3:45 PM",
  "4:0 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",
  "5:0 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:0 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:0 PM",
  "7:15 PM",
  "7:30 PM",
  "7:45 PM",
  "8:0 PM",
  "8:15 PM",
  "8:30 PM",
  "8:45 PM",
  "9:0 PM",
];

async function saleTbody(date) {
  const apiObj = fetchTime;
  const apiDate = fetchTime.date,
    apiTime = fetchTime.time;
  if (!date) {
    let now = new Date();
    let date1 =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    date = date1;
  }
  if (date == apiDate) {
    //today
  }
  document.getElementById("today").innerHTML = date;
  const ref = doc(db, "result", date);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const result = docSnap.data();
    document.getElementById("sale-tbody").innerHTML = `<li class="table-header">
            <div class="col">Time</div>
            <div class="col">Lucky No.</div>
          </li>`;
    // let keys = Object.keys(result);
    // keys.forEach((dtime) => {
    dtimes.forEach((dtime) => {
      if (result[dtime] != undefined || result[dtime] != null)
        document.getElementById("sale-tbody").innerHTML +=
          `<li class="table-row">
      <div class="col">` +
          dtime +
          `</div>
      <div class="col or" ><strong>` +
          result[dtime] +
          `</strong></div>
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
