// @ts-ignore
/* eslint-disable */
import { request } from '@/utils/request';
import axios from 'axios'
import { baseURL } from '@/utils/config';

export type CopywritingHistory = {
  _id: string,
  guide: string,
  scoringCriteria: string,
  conclusion: string,
  keyword: string,
}

export async function list(options?: { [key: string]: any }) {
  return request({
    url: 'copywritingHistory',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: options,
  });
}

function handleStream(res: any) {
  const responseText = res.target.responseText
  console.log(responseText, 'ss')
}

export async function add(copywritingHistory: CopywritingHistory) {
  await axios({
    url: `${baseURL}/copywritingHistory`,
    method: 'POST',
    data: copywritingHistory,
    responseType: 'stream',
    headers: {
      'Content-Type': 'application/json',
    },
    onDownloadProgress: handleStream
  });
}

export async function update(id: string) {
  await axios({
    url: `${baseURL}/copywritingHistory/${id}`,
    method: 'PUT',
    responseType: 'stream',
    headers: {
      'Content-Type': 'application/json',
    },
    onDownloadProgress: handleStream
  });

}