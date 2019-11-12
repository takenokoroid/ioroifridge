<template>
  <div>
    <div id="form">
      食べ物検索：
      <input type="text" v-model="searchKey" />
    </div>
    <div id="sort">
      消費期限ソート：
      <select name="sort" v-model="selected">
        <option>昇順</option>
        <option>降順</option>
      </select>
    </div>
    <output-data :fridge="fridge" v-if="showOutput"></output-data>
  </div>
</template>

<script>
import firebase from "firebase";
import OutputData from "../components/OutputData.vue";

export default {
  name: "search",
  components: {
    OutputData
  },
  data() {
    return {
      database: null,
      fridgeRef: null,
      fridge: {},
      fridgeName: "",
      searchKey: "",
      showOutput: true,
      selected: "",
      obj: {}
    };
  },
  methods: {
    toggle: function() {
      this.showOutput = false;
      this.$nextTick(() => (this.showOutput = true));
    },
    kanaToHira: function(str) {
      return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        let chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
      });
    },
    hiraToKana: function(str) {
      return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
      });
    },
    objSearch: function(obj) {
      let _this = this;
      Object.keys(obj).forEach(function(key) {
        let str = obj[key].name;
        if (
          _this.hiraToKana(str).indexOf(_this.searchKey) > -1 ||
          _this.kanaToHira(str).indexOf(_this.searchKey) > -1
        ) {
          //部分一致したらなにする？
          console.log("部分一致成功削除しません");
        } else {
          //部分一致しなかったら
          console.log("部分一致失敗削除対象です");
          delete obj[key];
        }
      });
    },
    objectAscSort: function(obj) {
      let list = [];
      Object.keys(obj).forEach(function(key) {
        list.push(obj[key].expiryDate);
      });
      list.sort();
      let result = [];
      let dummyobj = {};
      for (let i = 0; i < list.length; i++) {
        for (let key in obj) {
          if (obj[key].expiryDate == list[i]) {
            dummyobj[key] = obj[key];
            console.table(dummyobj);
            break;
          }
        }
      }
      console.log(dummyobj);
      return dummyobj;
    },
    objectDescSort: function(obj) {
      let list = [];
      Object.keys(obj).forEach(function(key) {
        list.push(obj[key].expiryDate);
      });
      list.sort();
      list.reverse();
      let result = [];
      let dummyobj = {};
      for (let i = 0; i < list.length; i++) {
        for (let key in obj) {
          if (obj[key].expiryDate == list[i]) {
            dummyobj[key] = obj[key];
            console.table(dummyobj);
            break;
          }
        }
      }
      console.log(dummyobj);
      return dummyobj;
    }
  },
  watch: {
    searchKey: function(newString, oldString) {
      let _this = this;
      if (newString === "") {
        console.log("fridgeを復元します");
        this.fridgeRef.on("value", function(snapshot) {
          _this.fridge = snapshot.val();
        });
      } else {
        this.objSearch(this.fridge);
      }
      this.toggle();
    },
    selected: function(newString, oldString) {
      if (newString === "昇順") this.fridge = this.objectAscSort(this.fridge);
      else this.fridge = this.objectDescSort(this.fridge);
      this.toggle();
    }
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
  }
};
</script>

<style>
</style>