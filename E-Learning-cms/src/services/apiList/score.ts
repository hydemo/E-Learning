// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export type Score = {
  _id: string,
  systemPrompt: string,
  prompt: string,
  result?: any[],
  totalScore?: number,
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'scores',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

export async function add(score: Score) {
  return request({
    url: 'scores',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: score,
  });
}

export async function refresh(id: String) {
  return request({
    url: `scores/${id}/refresh`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}