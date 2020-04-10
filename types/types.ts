import * as t from 'io-ts'

export const DateData = t.type({
    date: t.string,
    confirmed: t.number,        
    deaths: t.number,
    recovered: t.number
})

export const CountryData = t.type({
    name: t.string,
    dates: t.array(DateData),
})

export const FormattedData = t.array(CountryData)

export type TDateData = t.TypeOf<typeof DateData>
export type TCountryData = t.TypeOf<typeof CountryData>
export type TFormattedData = t.TypeOf<typeof FormattedData>

export type TEditedFullData = {
    [country: string]: {
        show: boolean,
        dates: TDateData[]
    }
}

export type TRawData = {
    [country: string]: TDateData[]
}

export type TTotals = Pick<TDateData, 'confirmed' | 'deaths'>

export const ListCountry = t.type({
    name: t.string,
    index: t.number
})

export type ListCountryT = t.TypeOf<typeof ListCountry>