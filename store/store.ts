import { combineReducers, compose, createStore } from 'redux'
import { dataReducer, TDataState } from './data/dataReducer'
import { TActions } from './actionTypes'

const rootReducer = combineReducers({
    data: dataReducer,
})
  
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
    
const store = createStore(
    rootReducer,
)

export default store

export type TReduxState = {
    data: TDataState
}

export type TReduxDispatch = React.Dispatch<TActions>