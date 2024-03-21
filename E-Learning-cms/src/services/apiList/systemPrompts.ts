// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export type SystemPrompt = {
  _id: string,
  name: string,
  prompt: string,
  fields: string[]
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'systemPrompts',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

export async function add(systemPrompt: SystemPrompt) {
  return request({
    url: 'systemPrompts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: systemPrompt,
  });
}

export async function update(id: string, systemPrompt: SystemPrompt) {
  return request({
    url: `systemPrompts/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: systemPrompt
  });
}

export async function remove(id: string,) {
  return request({
    url: `systemPrompts/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}