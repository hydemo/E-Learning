// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';

export type ScoringCriteria = {
  _id: string,
  name: string,
  content: string,
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'scoringCriteria',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

export async function add(scoringCriteria: ScoringCriteria) {
  return request({
    url: 'scoringCriteria',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: scoringCriteria,
  });
}

export async function update(id: string, scoringCriteria: ScoringCriteria) {
  return request({
    url: `scoringCriteria/${id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: scoringCriteria
  });
}

export async function remove(id: string,) {
  return request({
    url: `scoringCriteria/${id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}