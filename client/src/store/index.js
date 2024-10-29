import { defineStore } from "pinia"
import state from "./state"
import actions from "./actions"

const useShopStore = defineStore("shop", {
  state,
  actions
})

export default useShopStore