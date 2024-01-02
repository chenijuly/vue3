/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2024-01-02 10:36:17
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 10:41:23
 */
import { post } from '../utils/request'
export const toLogin = async (values) => {
  const res = post("/api/julyauth/form/password", {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    data: {
      ...values,
    },
  });
  return res
}