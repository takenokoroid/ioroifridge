const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axiosBase = require("axios");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//httpsにアクセスすると発火して関数内のコードが実行される
function getNowYMD() {
  let dt = new Date();
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let result = y + "-" + m + "-" + d;
  return result;
}

function getNextYMD() {
  let day = 7;
  let dt = new Date();
  dt.setDate(dt.getDate() + day);
  let y = dt.getFullYear();
  let m = ("00" + (dt.getMonth() + 1)).slice(-2);
  let d = ("00" + dt.getDate()).slice(-2);
  let result = y + "-" + m + "-" + d;
  return result;
}

exports.postSlack = functions.https.onRequest((request, response) => {
  let option = {
    method: "post",
    baseURL: functions.config().slack.webhook_url,
    header: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: `payload={
    "text": "test message",
  }`
  };
  let users = "init users";
  let showtext = "init showtext";
  const nowYMD = getNowYMD();
  const nextYMD = getNextYMD();
  let db = admin.database().ref("/fridge1");
  let search = db
    .orderByChild("expiryDate")
    .startAt(nowYMD)
    .endAt(nextYMD);
  search.on("value", snapshot => {
    users = snapshot.val();
    response.send(users);
    showtext = "changed text";
  });
  option.data = `payload={
    "text": "${showtext}",
  }`;
  axiosBase.request(option);
});
