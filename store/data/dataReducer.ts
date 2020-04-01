import { TFormattedData, TCountryData } from "../../pages/index"
import { TActions, actionTypes } from "../actionTypes"

export type TDataState = {
    fullData?: TFormattedData
    filteredData?: TFormattedData
    nameFilter: string
}

const defaultDataState: TDataState = {
    nameFilter: ''
}

const setData = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.SET_DATA) {
        const newFullData: TFormattedData = action.payload.map((data: TCountryData) => ({
                ...data,
                name: data.name === 'US' ? 'United States of America' : data.name,
            }
        ))

        return {
            ...state,
            fullData: newFullData,
            filteredData: newFullData,
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

        default:
            return { ...state }
    }
}