<template>
  <div id="header">
    <img src="../assets/ioroi-lab.png" alt="ioroi-log" />
    <div class="partition"></div>
    <span>IoroiLabFridge</span>
    <div class="icon">予定地</div>
    <div class="icon">予定地</div>
    <div class="icon">予定地</div>
  </div>
</template>

<script>
export default {
  name: "headers"
};
</script>

<style scoped>
.partition {
  background-color: gray;
  width: 2px;
  height: 60px;
  margin: 5px 5px;
  display: inline-block;
}
.icon {
  width: 80px;
  height: 80px;
  display: inline-block;
}
</style>
