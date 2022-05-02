import { Maybe } from '@shared/types/utils'

type State = {
  categories: Maybe<Array<any>>
}

export const state: State = {
  categories: null,
}
