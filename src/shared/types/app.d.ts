export interface IRest {
  get: (url: string, ...args: any) => Promise<{ data: any }>
  post: (url: string, ...args: any) => Promise<{ data: any }>
}

export interface IRepository {
  create: (category: any) => Promise<{ data: any }>
}
