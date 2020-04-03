import { dataActionTypes } from './actionTypes'
import { TFormattedData, TTotals } from '../../types/types'

export type TDataActions = 
| ({ type: dataActionTypes.SET_DATA, payload: TFormattedData })
| ({ type: dataActionTypes.SET_NAME_FILTER, payload: string })
| ({ type: dataActionTypes.SET_TOTALS_ALL, payload: TTotals })
| ({ type: dataActionTypes.SELECTED_COUNTRIES_CLEAR_ALL })
| ({ type: dataActionTypes.SELECTED_COUNTRIES_SELECT_ALL })
| ({ type: dataActionTypes.TOGGLE_COUNTRY_SELECTION, payload: string })

export const setData = (data: TFormattedData): TDataActions => ({
    type: dataActionTypes.SET_DATA,
    payload: data
})

export const setNameFilter = (name: string): TDataActions => ({
    type: dataActionTypes.SET_NAME_FILTER,
    payload: name
})

export const setTotalsAll = (totals: TTotals): TDataActions => ({
    type: dataActionTypes.SET_TOTALS_ALL,
    payload: totals
})

export const selectAllCountries = (): TDataActions => ({
    type: dataActionTypes.SELECTED_COUNTRIES_SELECT_ALL
})

export const clearAllCountries = (): TDataActions => ({
    type: dataActionTypes.SELECTED_COUNTRIES_CLEAR_ALL
})

export const toggleCountrySelection = (country: string): TDataActions => ({
    type: dataActionTypes.TOGGLE_COUNTRY_SELECTION,
    payload: country
})