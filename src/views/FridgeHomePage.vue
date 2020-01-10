<template>
  <div>
    <li>
      <ul>
        <router-link to="search" @click.native="addLocalStorage()">
          <img :src="fridge.img" :alt="fridge.description" />
        </router-link>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: "fridgeHome",
  data() {
    return {
      fridge: {
        img: require("../assets/fridge.png"),
        name: "fridge1",
        description: "でかい方"
      }
    };
  },
  methods: {
    addLocalStorage: function() {
      localStorage.setItem("fridge", this.fridge.name);
    }
  }
};
</script>

<style>
</style>