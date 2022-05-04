declare interface ICategory {
  title: string
  url: string
  image: Maybe<string>
  parent: Maybe<string>
  children: Array<any>
  order: number
  seo: {
    title: Maybe<string>
    description: Maybe<string>
    keywords: Maybe<string>
  }
}

declare type ParentCategory = ICategory & { _id: string }
