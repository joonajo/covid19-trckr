import { TRawData, TFormattedData, TCountryData, TDateData, TTotals, TEditedFullData } from "../types/types"

export const reformatResponseData = (data: TRawData): TFormattedData => {
    const formattedData: TFormattedData = Object.keys(data).map((key: string) => {
        return {
            name: key,
            dates: data[key],
        }
    }) 
    return formattedData
}

export const addShowProperty = (data: TRawData) => {
    const editedData: TEditedFullData = {}
    for (let key in data) {
        editedData[key] = {
            show: true,
            dates: data[key]
        }
    }
    return editedData
}

export const getTotals = (data: TFormattedData): TTotals => {
    let totalCases: number = 0
    let totalDeaths: number = 0

    data.forEach((data: TCountryData) => {
        const lastData: TDateData = { ...data.dates[data.dates.length-1] }
        totalCases += lastData.confirmed
        totalDeaths += lastData.deaths
    })

    return {
        confirmed: totalCases,
        deaths: totalDeaths
    }
}