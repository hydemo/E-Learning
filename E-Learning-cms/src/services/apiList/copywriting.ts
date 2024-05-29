// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export type Copywriting = {
  _id: string,
  guide: string,
  scoringCriteria: string,
  conclusion: string,
  keyword: string,
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'copywriting',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

export async function add(copywriting: Copywriting) {
  return request({
    url: 'copywriting',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: copywriting,
  });
}

export async function update(id: string, copywriting: Copywriting) {
  return request({
    url: `copywriting/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: copywriting
  });
}

export async function remove(id: string,) {
  return request({
    url: `copywriting/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}