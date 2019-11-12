import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import router from "./router";
const env = process.env;

Vue.config.productionTip = false;

//Initialize Firebase
let config = {
  apiKey: env.VUE_APP_API_KEY,
  authDomain: env.VUE_APP_AUTH_DOMAIN,
  databaseURL: env.VUE_APP_DATABASE_URL,
  projectId: env.VUE_APP_PROJECT_ID,
  storageBucket: env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: env.VUE_APP_MESSAGING_SENDERID,
  appId: env.VUE_APP_APP_ID,
  measurementId: env.VUE_APP_MEASUREMENT_ID
};
firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
