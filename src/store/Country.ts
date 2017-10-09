import {types,} from 'mobx-state-tree';
import client from 'graphql/config';

const COUNTRY_SELECT = require('graphql/CountrySelect.graphql');
import {ApolloQueryResult} from 'apollo-client';
import {IObservableArray} from 'mobx';


const Currency = types.model('Currency',
    {
        code: types.maybe(types.string),
        name: types.maybe(types.string),
        symbol: types.maybe(types.string),
        rateSEK: types.number
    });

const Country = types.model(
    'Country',
    {
        name: types.string,
        alpha2Code: types.string,
        currency: Currency,
        capital: types.string,
        population: types.number,
        convertedFromSEK: types.maybe(types.number)
    });

export type ICountry = typeof Country.Type;

export const CountriesStore = types.model({
    countries: types.optional(types.array(Country), []),
    amountSEK: types.maybe(types.number)
}, {
    loadCountry(iso2Code: string | any) {
        this.fetchCountry(iso2Code.toString()).then((f: ICountry) => this.fetchCountrySuccess(f));
    },
    fetchCountry(iso2Code: string): Promise<ICountry> {
        return client.query({
            query: COUNTRY_SELECT,
            variables: {
                iso2Code
            }
        }).then((q: ApolloQueryResult<any>) => {
            if (q.data.errors)
                throw q.data.errors.toString();

            return q.data.country;
        }).catch((e) => console.error('Failed to load country', e));
    },
    fetchCountrySuccess(country: ICountry) {
        this.countries.push(country);
    },
    calculateAmount(amount: string) {
        const convertedAmount = parseFloat(amount);
        if (isNaN(convertedAmount))
            return; // Do nothing, we could think of display an error message on the input.

        this.countries.forEach((c: ICountry) => c.convertedFromSEK = c.currency.rateSEK * convertedAmount);
    }
});

export type ICountriesStore = typeof CountriesStore.Type;