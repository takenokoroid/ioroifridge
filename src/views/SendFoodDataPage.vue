<template>
  <div class="testForm">
    <form action>
      <send-text-form label="商品名" v-model="newFoodName"></send-text-form>
      <send-date-form label="消費期限" v-model="newExpiryDate"></send-date-form>
      <send-text-form label="購入者" v-model="newPurchaser"></send-text-form>
      <send-text-form label="個数" v-model="newCount"></send-text-form>
      <send-text-form label="備考" v-model="newDescription"></send-text-form>
      <router-link to="search" v-on:click.native="createFoodData()">冷蔵庫に登録</router-link>
      <br />
      <router-link to="search">冷蔵庫の中を見る</router-link>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import SendTextForm from "../components/SendTextForm.vue";
import SendDateForm from "../components/SendDateForm.vue";

export default {
  name: "sendData",
  components: {
    SendTextForm,
    SendDateForm
  },
  created: function() {
    this.fridgeName = localStorage.getItem("fridge");
    this.database = firebase.database();
    //ここ冷蔵庫追加のために変更するかも。
    this.fridgeRef = this.database.ref(this.fridgeName);

    let _this = this;
    this.fridgeRef.on("value", function(snapshot) {
      _this.fridge = snapshot.val();
    });
  },
  methods: {
    createFoodData: function() {
      if (this.newFoodName == "") {
        //将来的にはnewCountを1++にする
        return;
      }
      this.fridgeRef.push({
        name: this.newFoodName,
        expiryDate: this.newExpiryDate,
        count: this.newCount,
        purchaser: this.newPurchaser,
        description: this.newDescription
      });
      //登録後の初期化処理
      this.newFoodName = "";
      this.newExpiryDate = "";
      this.newCount = "";
      this.newPurchaser = "";
      this.newDescription = "";
    }
  },
  mounted: function() {},
  data() {
    return {
      database: null,
      fridgeRef: null,
      newFoodName: "",
      newExpiryDate: "",
      newCount: "",
      newPurchaser: "",
      newDescription: "",
      fridge: [],
      fridgeName: ""
    };
  }
};
</script>