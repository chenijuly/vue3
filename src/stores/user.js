/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2024-01-02 10:12:08
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 15:25:49
*/
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('user', {
  state: () => ({
      count: 0,
      username: '',
      sex: 0
  }),
  getters: {
    userInfo(state) {
      const {
        username,
        sex
      } = state
      return {
        username,
        sex
      }
    }
  },
  actions: {
    increment() {
      this.count++
    },
    addUserInfo({username, sex}) {
      this.username = username
      this.sex = sex
    }
  }
})
