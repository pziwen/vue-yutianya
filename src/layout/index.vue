<template>
  <div class="layout">
    <header class="min-w1200">
      <video
        src="@/assets/video/winter-evening.webm"
        autoplay
        muted
        loop
      ></video>
    </header>
    <FlyingCarrot />
    <Navbar />
    <div class="main-box">
      <div class="main">
        <transition name="fade-main" mode="out-in">
          <keep-alive>
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </div>
    </div>
    <footer class="min-w1200">
      <video src="@/assets/video/winter-night.webm" autoplay muted loop></video>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import FlyingCarrot from "components/FlyingCarrot";
export default {
  name: "Layout",
  components: {
    Navbar,
    FlyingCarrot
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  header {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-box{
    background: #FFF;

    .main{
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
  }

  footer {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>