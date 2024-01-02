/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-28 07:53:17
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 15:24:43
 */
import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"
var router=createRouter({
    history:createWebHistory(),
    routes
})
// 导航守卫
router.beforeEach(async (to, from) => {
    const isAuthenticated = sessionStorage.getItem('token')
    console.log(isAuthenticated);
    if (
      // 检查用户是否已登录
      !isAuthenticated &&
      // ❗️ 避免无限重定向
      to.name !== 'login'
    ) {
      // 将用户重定向到登录页面
      return { name: 'login' }
    }
  })
export default router