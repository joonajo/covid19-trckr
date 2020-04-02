import { TActions, actionTypes } from "../actionTypes"
import { TFormattedData, TCountryData, TTotals, TRawData } from "../../types/types"

export type TDataState = {
    fullData?: TFormattedData
    filteredData?: TFormattedData
    selectedCountries?: string[]
    totals?: TTotals
    nameFilter: string
}

const defaultDataState: TDataState = {
    nameFilter: ''
}

const setData = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.SET_DATA) {
        const selectedCountries: string[] = []
        const newFullData: TFormattedData = action.payload.map((data: TCountryData) => {
            selectedCountries.push(data.name === 'US' ? 'United States of America' : data.name)
            return ({
                    ...data,
                    name: data.name === 'US' ? 'United States of America' : data.name,
                }
            )
        })

        return {
            ...state,
            fullData: newFullData,
            filteredData: newFullData,
            selectedCountries: selectedCountries
        }
    }
    return { ...state }
}

const filterByName = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.SET_NAME_FILTER && state.fullData) {
        const newFilteredData: TFormattedData = state.fullData.filter((data: TCountryData) => data.name.toLowerCase().includes(action.payload.toLowerCase()))

        return {
            ...state,
            nameFilter: action.payload,
            filteredData: newFilteredData,
        }
    }
    return { ...state }
}

export const dataReducer = (state: TDataState = defaultDataState, action: TActions): TDataState => {
    switch (action.type) {
        case actionTypes.SET_DATA:
            return setData(state, action)
    
        case actionTypes.SET_NAME_FILTER:
            return filterByName(state, action)

        case actionTypes.SET_TOTALS_ALL:
            return { ...state, totals: action.payload }

        default:
            return { ...state }
    }
}