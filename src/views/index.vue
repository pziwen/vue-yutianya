<template>
  <div class="home">
    <h1>这里是首页</h1>
    <div class="btn">{{ num }}</div>
    <button @click="handleNum(-1)">-1</button>
    <button @click="handleNum(1)">+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    handleNum(val) {
      this.num += val;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 1000px;
  background: rgba(255, 255, 255, .3);
  overflow: hidden;
}
</style>