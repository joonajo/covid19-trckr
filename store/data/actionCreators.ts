import { dataActionTypes } from './actionTypes'
import { TFormattedData } from '../../pages/index'

export type TDataActions = 
| ({ type: dataActionTypes.SET_DATA, payload: TFormattedData })
| ({ type: dataActionTypes.SET_NAME_FILTER, payload: string })

export const setData = (data: TFormattedData): TDataActions => ({
    type: dataActionTypes.SET_DATA,
    payload: data
})

export const setNameFilter = (name: string): TDataActions => ({
    type: dataActionTypes.SET_NAME_FILTER,
    payload: name
})