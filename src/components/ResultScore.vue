<template>
    <div style="border-bottom: 2px; border-style: solid gray; width: 500px; margin-right: auto; margin-left: auto; display: flex; flex-direction: row; justify-content: center;">
       <div style="width: auto; padding: 16px; border: 1px solid gray;border-radius: 5px;box-shadow: 0 6px 3px -3px #777;">{{ humanValue }}</div><div style="width: auto; padding: 16px;margin-left: 8px;margin-right: 8px;"> X </div><div style="width: auto; padding: 16px;border: 1px solid gray;border-radius: 5px;box-shadow: 0 6px 3px -3px #777;">{{ machineValue }}</div>
    </div>
</template>

<script>


export default {
name: 'ResultScore',
  data() {
    return {
      humanValue: 0,
      machineValue: 5
    }
  },
  components: {

  },
  methods: {
   
  },
  beforeCreate() { 
      console.log("Before Create");
  },
  created() {
      console.log("Created");
  },
  beforeUpdate() {
      console.log("Before Update");
  }
}

</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
