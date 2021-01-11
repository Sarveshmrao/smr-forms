import { createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { auth, AuthState } from './auth'

export interface State {
  auth: AuthState
}

const root = (state: State, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload } as State
  }

  const combined = combineReducers({
    auth,
  })

  return combined(state, action)
}

const makeStore: MakeStore<State> = () => {
  return createStore(root, undefined, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const wrapper = createWrapper<State>(makeStore, { debug: false })
