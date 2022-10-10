import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosService {
  private init() {
    const client = axios.create({
      // Add the things you need in headers
      headers: {
        'User-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.277 Whale/2.9.118.38 Safari/537.36',
      },
    });

    return client;
  }

  get client() {
    return this.init();
  }

  get<T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }
}
