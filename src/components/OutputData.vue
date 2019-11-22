<template>
  <div id="form">
    <div id="item" v-for="(item,key) in fridge" :key="key">
      <food-data-list :item="item"></food-data-list>
      <div id="edit">
        <router-link to="/search" @click.native="deleteFood(key)">削除</router-link>
        <router-link :to="{name:'change',params:{item:item,primaryKey:key}}">編集</router-link>
      </div>
    </div>
    <router-link to="send">追加に戻る</router-link>
  </div>
</template>


<script>
import firebase from "firebase";
import FoodDataList from "./FoodDataList.vue";

export default {
  name: "outputData",
  created: function() {
    this.fridgeName = localStorage.getItem("fridge");
    this.database = firebase.database();
    this.fridgeRef = this.database.ref(this.fridgeName);
  },
  methods: {
    deleteFood: function(key) {
      this.database
        .ref(this.fridgeName)
        .child(key)
        .remove();
    }
  },
  data() {
    return {
      database: null,
      fridgeRef: null,
      fridgeName: ""
    };
  },
  props: {
    fridge: Object
  },
  components: {
    FoodDataList
  }
};
</script>

<style>
#edit {
  width: 130px;
  margin: 0 0 0 50px;
}
#edit a {
  margin: 10px;
}
#item {
  padding: 5px 10px 5px 10px;
  border: solid;
  margin: 10px;
  border-color: gray;
}
#item dl {
  margin-bottom: 5px;
}
</style>