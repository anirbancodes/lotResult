const optionsLiveTime = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "livetime.p.rapidapi.com",
    "X-RapidAPI-Key": "aa4a9e28fdmsh24e8338e2ae0ba7p104b0bjsna4ed2d34bd32",
  },
};

const optionsQcTime1 = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "qctime1.p.rapidapi.com",
    "X-RapidAPI-Key": "f61b57f958msh481ee55292f5d4dp1e901cjsnf5e1d31890bd",
  },
};

let date, time, hms;

async function fetchTime() {
  let apiData;
  await fetch("https://qctime1.p.rapidapi.com/time", optionsQcTime1)
    .then((res) => res.json())
    .then((res) => {
      apiData = res;
      // time = res.time;
      // date = res.date;
    })
    .catch(async (err) => {
      await fetch("https://livetime.p.rapidapi.com/time", optionsLiveTime)
        .then((res) => res.json())
        .then((res) => {
          apiData = res;
          // time = res.time;
          // date = res.date;
        });
    });
  return apiData;
}
displayTime();
async function displayTime() {
  await fetchTime();
}

export { fetchTime };
