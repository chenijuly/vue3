/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-28 07:53:59
 * @LastEditors: jdchen
 * @LastEditTime: 2023-12-28 08:21:38
 */
const routes = [
  {
      name: "home",
      path: "/",
      component: () => import("../components/HelloWorld.vue")
  },
  {
      name: "login",
      path: "/company-login",
      component: () => import("../components/Login.vue")
  },
  {
      name: "reg",
      path: "/company-reg",
      component: () => import("../components/Register.vue")
  },
]



export default routes 