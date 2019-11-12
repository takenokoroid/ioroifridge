<template>
  <div>
    <send-text-form label="商品名" v-model="items.name"></send-text-form>
    <send-text-form label="消費期限" v-model="items.expiryDate"></send-text-form>
    <send-text-form label="購入者" v-model="items.purchaser"></send-text-form>
    <send-text-form label="個数" v-model="items.count"></send-text-form>
    <send-text-form label="備考" v-model="items.description"></send-text-form>
    <router-link to="search">中身をみる</router-link>
    <router-link to="search" @click.native="updateFood(items,priKey)">編集完了</router-link>
    <food-data-list-label text="変更前" :item="$route.params.item"></food-data-list-label>
    <food-data-list-label text="変更後" :item="items"></food-data-list-label>
  </div>
</template>

<script>
import firebase from "firebase";
import FoodDataListLabel from "../components/FoodDataListLabel.vue";
import SendTextForm from "../components/SendTextForm.vue";

export default {
  name: "editForm",
  data() {
    return {
      database: null,
      fridgeRef: null,
      items: {
        name: "",
        expiryDate: "",
        count: "",
        purchaser: "",
        description: ""
      },
      priKey: "",
      fridge: [],
      fridgeName: ""
    };
  },
  created: function() {
    this.fridgeName = localStorage.getItem("fridge");
    this.database = firebase.database();
    this.fridgeRef = this.database.ref(this.fridgeName);

    let _this = this;
    this.fridgeRef.on("value", function(snapshot) {
      _this.fridge = snapshot.val();
    });
  },
  components: {
    FoodDataListLabel,
    SendTextForm
  },
  mounted: function() {
    this.items.name = this.$route.params.item.name;
    this.items.expiryDate = this.$route.params.item.expiryDate;
    this.items.count = this.$route.params.item.count;
    this.items.purchaser = this.$route.params.item.purchaser;
    this.items.description = this.$route.params.item.description;
    this.priKey = this.$route.params.primaryKey;
  },
  props: {
    item: Object
  },
  methods: {
    updateFood: function(item, key) {
      let updates = {};
      updates["/" + this.fridgeName + "/" + key] = item;
      this.database.ref().update(updates);
    }
  }
};
</script>

<style>
</style>