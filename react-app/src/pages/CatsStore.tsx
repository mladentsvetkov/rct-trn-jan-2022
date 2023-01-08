import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import lodash from 'lodash'
import { useReducer, createContext, Dispatch, ReactNode } from 'react'

interface Cat {
  url: string
  id: string
  title: string
}

interface Query {
  q: string
  limit: number
}

export interface State {
  query: Query
  data: Cat[]
}

const initialState: State = {
  query: {
    q: 'cat',
    limit: 0,
  },
  data: [],
}

export enum ActionType {
  addData = 'addData',
  updateQuery = 'updateQuery',
  deleteData = 'deleteData',
}

interface AddData {
  type: ActionType.addData
  payload: { cats: Cat[] }
}

interface UpdateQuery {
  type: ActionType.updateQuery
  payload: { newQuery: Query }
}

interface DeleteData {
  type: ActionType.deleteData
}

export type Actions = AddData | UpdateQuery | DeleteData

const reducer = (currentState: State, action: Actions) => {
  const { type } = action

  switch (type) {
    case ActionType.addData: {
      const newState = lodash.cloneDeep(currentState)

      newState.data = [...action.payload.cats]
      return newState
    }

    case ActionType.deleteData: {
      const newState = lodash.cloneDeep(currentState)
      const newData = [] as Cat[]

      newState.data = [...newData]
      newState.query.limit = 0
      return newState
    }

    case ActionType.updateQuery: {
      const newState = lodash.cloneDeep(currentState)
      const newQuery = newState.query
      const newQueryMerged = { ...newQuery, ...action.payload.newQuery }

      newState.query = { ...newQueryMerged }

      return newState
    }

    default: {
      return currentState
    }
  }
}

interface CatDataItemUi {
  id: string
  title: string
  url: string
}

interface CatsResponse {
  data: { id: string; title: string; images: { preview_gif: { url: string } } }[]
}

export const CatsContext = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: {} as State,
  dispatch: () => {},
})

const CatsStore = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getCats = async (query: Query) => {
    const { data }: AxiosResponse<CatsResponse> = await axios(
      `https://api.giphy.com/v1/gifs/search?api_key=&q=${query.q}&limit=${query.limit}&offset=0&rating=g&lang=en`
    )
    return data
  }

  useQuery(['cats', state.query.limit], () => getCats(state.query), {
    retry: false,
    keepPreviousData: true,
    onSuccess: (data) => {
      const transformedData = data.data.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
            url: item.images.preview_gif.url,
          } as CatDataItemUi)
      )
      dispatch({ type: ActionType.addData, payload: { cats: transformedData } })
    },
  })

  return <CatsContext.Provider value={{ state, dispatch }}>{children}</CatsContext.Provider>
}

export default CatsStore
