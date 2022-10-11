import { StubService } from 'test/stub/stub.interface';

export type StubDBService = StubService<'findAll'>;

export const stubDBService: StubDBService = {
  findAll: jest.fn(),
};
