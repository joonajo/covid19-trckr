import { TActions, actionTypes } from "../actionTypes"
import { TFormattedData, TCountryData, TTotals, TRawData, TEditedFullData } from "../../types/types"

export type TDataState = {
    rawData?: TRawData
    editedData?: TEditedFullData
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
        return {
            ...state,
            rawData: action.payload.raw,
            editedData: action.payload.edited
        }
    }
    return { ...state }
}

const filterByName = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.SET_NAME_FILTER) {
        return {
            ...state,
            nameFilter: action.payload,
        }
    }
    return { ...state }
}

const toggleCountry = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.TOGGLE_COUNTRY_SELECTION && state.editedData) {
        const oldValue: boolean = state.editedData[action.payload].show 

        const newEditedData: TEditedFullData = {
            ...state.editedData,
            [action.payload]: {
                ...state.editedData[action.payload],
                show: !oldValue
            }   
        }

        return {
            ...state,
            editedData: newEditedData
        }
    }
    return { ...state }
}

const clearAllSelected = (state: TDataState, action: TActions): TDataState => {
    if (action.type === actionTypes.SELECTED_COUNTRIES_CLEAR_ALL && state.editedData) {
        const newEditedData: TEditedFullData = {}

        for (let key in state.editedData) {
            newEditedData[key] = {
                ...state.editedData[key],
                show: false
            }
        }

        return {
            ...state,
            editedData: newEditedData,
        }
    }
    return { ...state }
}

const setAllCountries = (state: TDataState, val: boolean): TDataState => {
    const newEditedData: TEditedFullData = {}

    for (let key in state.editedData) {
        newEditedData[key] = {
            ...state.editedData[key],
            show: val
        }
    }

    return {
        ...state,
        editedData: newEditedData,
    }
}


export const dataReducer = (state: TDataState = defaultDataState, action: TActions): TDataState => {
    switch (action.type) {
        case actionTypes.SET_DATA:
            return setData(state, action)
    
        case actionTypes.SET_NAME_FILTER:
            return filterByName(state, action)

        case actionTypes.SET_TOTALS_ALL:
            return { ...state, totals: action.payload }

        case actionTypes.TOGGLE_COUNTRY_SELECTION:
            return toggleCountry(state, action)

        case actionTypes.SELECTED_COUNTRIES_CLEAR_ALL:
            return setAllCountries(state, false)

        case actionTypes.SELECTED_COUNTRIES_SELECT_ALL:
            return setAllCountries(state, true)

        default:
            return { ...state }
    }
}