// @ts-ignore
/* eslint-disable */
import { getLocale } from 'umi';
import { request } from '@/utils/request';
import md5 from 'md5';

/** 登录接口 POST /api/login/account */
export async function login(
  body: API.LoginParams,
  options?: { [key: string]: any },
) {
  if (!body.password) {
    return;
  }
  const password = md5(body.password);
  return request({
    url: 'login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body, password },
  });
}

export async function newPassword(
  oldPass: string,
  newPass: string,
) {
  return request({
    url: `resetPass`,
    method: 'PUT',
    data: { oldPass: md5(oldPass), newPass: md5(newPass) },
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


