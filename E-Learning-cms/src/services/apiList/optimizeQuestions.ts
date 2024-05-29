// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export type OptimizeQuestions = {
  _id: string,
  guide: string,
  scoringCriteria: string,
  conclusion: string,
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'optimizeQuestions',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

export async function add(optimizeQuestions: OptimizeQuestions) {
  return request({
    url: 'optimizeQuestions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: optimizeQuestions,
  });
}

export async function update(id: string, optimizeQuestions: OptimizeQuestions) {
  return request({
    url: `optimizeQuestions/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: optimizeQuestions
  });
}

export async function remove(id: string,) {
  return request({
    url: `optimizeQuestions/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}