import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'

import 'style/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    scrollTimeId: ''
  },
  mounted() {
    window.addEventListener('scroll', this.justifyPos)
  },
  methods: {
    // 记录滚动行为
    justifyPos() {
      // 节流
      this.scrollTimeId && clearTimeout(this.scrollTimeId)
      this.scrollTimeId = setTimeout(() => {
        // 获取页面滚动距离之后设置给当前路由的 元信息
        this.$route.meta.y = window.pageYOffset
      }, 300)
    }
  },
  render: h => h(App)
}).$mount('#app')