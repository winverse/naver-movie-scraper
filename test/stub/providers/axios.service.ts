import { StubService } from 'test/stub/stub.interface';

export type StubAxiosService = StubService<'get'>;

export const stubAxiosService: StubAxiosService = {
  get: jest.fn(),
};
