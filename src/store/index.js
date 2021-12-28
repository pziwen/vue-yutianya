import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulesPath) => {
  const modulesName = modulesPath.replance(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulesPath)
  modules[modulesName] = value.default
  return modules
})

const state = new Vuex.Store({
  modules,
  getters
})

export default state