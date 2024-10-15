import { defineStore } from "pinia"
import state from "./state"

const useShopStore = defineStore("shop", {
  state
})

export default useShopStore