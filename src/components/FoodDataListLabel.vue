<template>
  <div>
    <h2>{{ text }}</h2>
    <food-data-list :item="item"></food-data-list>
  </div>
</template>

<script>
import FoodDataList from "./FoodDataList.vue";

export default {
  name: "ChangeList",
  props: {
    text: String,
    item: Object
  },
  components: {
    FoodDataList
  }
};
</script>

<style>
</style>