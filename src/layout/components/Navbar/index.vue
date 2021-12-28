<template>
  <div class="nav-bar" :class="{ 'nav-fixed': isFixed }">
    <div class="nav-item">
      <router-link class="item-main" to="/home">首页</router-link>
    </div>
    <div class="nav-item">
      <span class="item-main">其他</span>
      <div class="item-sub-wrap">
        <router-link class="item-sub" to="/about">二级菜单</router-link>
        <router-link class="item-sub" to="/about">二级菜单</router-link>
        <router-link class="item-sub" to="/about">二级菜单</router-link>
        <router-link class="item-sub" to="/about">二级菜单</router-link>
      </div>
    </div>
    <div class="nav-item">
      <router-link class="item-main" to="/list">列表</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.isFixed = scroll > 180;
    });
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 56px;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: #38b6ff;
  color: #fff;
  position: relative;
  z-index: 10;

  .nav-item {
    line-height: 36px;
    padding: 10px 30px;
    font-size: 14px;
    cursor: pointer;
    position: relative;

    .item-sub-wrap {
      position: absolute;
      top: 56px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s ease;

      .item-sub {
        display: block;
        min-width: 130px;
        padding: 0 30px;
        white-space: nowrap;
        box-sizing: border-box;
        opacity: 0;
        transition: margin-left 0.5s ease, opacity 0.5s ease,
          background 0.3s ease;

        &:nth-child(odd) {
          margin-left: -60px;
          background: yellow;
        }

        &:nth-child(even) {
          margin-left: 60px;
          background: orange;
        }

        &:hover {
          background: #38b6ff;
        }
      }
    }

    &:hover {
      & > .item-sub-wrap {
        max-height: 300px;

        .item-sub {
          opacity: 1;
          &:nth-child(odd) {
            margin-left: 0;
          }

          &:nth-child(even) {
            margin-left: 0;
          }
        }
      }
    }
  }

  &.nav-fixed {
    position: fixed;
    top: 0;
  }
}
</style>
