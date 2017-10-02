import {types,} from 'mobx-state-tree';
import client from 'graphql/config';

const COUNTRY_SELECT = require('graphql/CountrySelect.graphql');
import {ApolloQueryResult} from 'apollo-client';
import {IObservableArray} from 'mobx';


const Currency = types.model('Currency',
    {
        code: types.maybe(types.string),
        name: types.maybe(types.string),
        symbol: types.maybe(types.string)
    });

const Country = types.model(
    'Country',
    {
        name: types.string,
        alpha2Code: types.string,
        currencies: types.optional(types.array(Currency), []),
        capital: types.string,
        population: types.number,
        convertedFromSEK: types.maybe(types.number)
    });

export type ICountry = typeof Country.Type;

export const CountriesStore = types.model({
    countries: types.optional(types.array(Country), []),
}, {
    loadCountry(iso2Code: string | any) {
        this.fetchCountries(iso2Code).then((f: ICountry) => this.fetchCountrySuccess(f));
    },
    fetchCountry(iso2Code: string): Promise<ICountry> {
        console.log("test");
        return client.query({
            query: COUNTRY_SELECT,
            variables: {
                iso2Code
            }
        }).then((q: ApolloQueryResult<any>) => q.data.country)
            .catch((e) => console.error('Failed to load country', e));
    },
    fetchCountrySuccess(country: ICountry) {
        this.countries.push(country);
    },
});

export type ICountriesStore = typeof CountriesStore.Type;