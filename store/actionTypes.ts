import { TDataActions } from './data/actionCreators'
import { dataActionTypes } from './data/actionTypes'

export const actionTypes = {
    ...dataActionTypes
}

export type TActions = 
| TDataActions