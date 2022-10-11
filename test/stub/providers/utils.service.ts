import { StubService } from 'test/stub/stub.interface';

export type StubUtilsService = StubService<'sleep'>;

export const stubUtilsService: StubUtilsService = {
  sleep: jest.fn(),
};
