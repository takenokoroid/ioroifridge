<template>
  <div>
    <dl>
      <dt>{{item.name}}</dt>
      <dd>{{item.expiryDate}}</dd>
      <dd>{{item.count}}</dd>
      <dd>{{item.purchaser}}</dd>
      <dd>{{item.description}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
name: "FoodDataList",
  props: {
    item: Object
  }
};
</script>

<style>
</style>