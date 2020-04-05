import { dataActionTypes } from './actionTypes'
import { TFormattedData, TTotals, TRawData, TEditedFullData } from '../../types/types'

export type TDataActions = 
| ({ type: dataActionTypes.SET_DATA, payload: { raw: TRawData, edited: TEditedFullData }})
| ({ type: dataActionTypes.SET_NAME_FILTER, payload: string })
| ({ type: dataActionTypes.SET_TOTALS_ALL, payload: TTotals })
| ({ type: dataActionTypes.SELECTED_COUNTRIES_CLEAR_ALL })
| ({ type: dataActionTypes.SELECTED_COUNTRIES_SELECT_ALL })
| ({ type: dataActionTypes.TOGGLE_COUNTRY_SELECTION, payload: string })
| ({ type: dataActionTypes.HIGHLIGHT_COUNTRY, payload: string })

export const setData = ( raw: TRawData, edited: TEditedFullData ): TDataActions => ({
    type: dataActionTypes.SET_DATA,
    payload: { raw: raw, edited: edited }
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

export const highlightCountry = (country: string): TDataActions => ({
    type: dataActionTypes.HIGHLIGHT_COUNTRY,
    payload: country
})