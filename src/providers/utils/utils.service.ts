import { Injectable } from '@nestjs/common';
import cuid from 'cuid';

@Injectable()
export class UtilsService {
  get genId() {
    return cuid();
  }
  sleep(delay: number) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }
}
