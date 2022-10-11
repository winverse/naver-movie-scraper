export type StubService<T extends string> = Record<T, jest.Mock<any, any>>;
