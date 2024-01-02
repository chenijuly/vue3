/*
 * @Description: 
 * @Author: jdchen
 * @Date: 2023-12-28 08:45:46
 * @LastEditors: jdchen
 * @LastEditTime: 2024-01-02 15:29:10
 */
import { post, get } from '../utils/request'
export const getEmailcode = async (number) => {
  const res = await get('/api/julyauth/register/email', {
    headers:{
      'Content-Type': 'multipart/form-data',
    },
    params: {
      number
    }
  })
  return res
}

export const saveEmailReg = async (data) => {
  const res = await post('/api/julyauth/user/register', {
    data
  })
  return res
}