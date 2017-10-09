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
    updateCountries(isoCodes: string[] = []) {
        if (isoCodes.length > this.countries.length) {
            const isoCodeFromCountries: string[] = this.countries.map((c: ICountry) => c.alpha2Code);
            const isoCode = isoCodes.find(i => !isoCodeFromCountries.find(ic => i === ic));
            this.loadCountry(isoCode);
        } else {
            const countryToRemove = this.countries.find((c: ICountry) => !isoCodes.find(i => c.alpha2Code === i));
            this.countries.remove(countryToRemove);
        }
    },
    loadCountry(isoCode: string | undefined) {
        this.fetchCountry(isoCode).then((f: ICountry) => this.fetchCountrySuccess(f));
    },
    fetchCountry(isoCode: string | undefined): Promise<ICountry> {
        return client.query({
            query: COUNTRY_SELECT,
            variables: {
                isoCode
            }
        }).then((q: ApolloQueryResult<any>) => {
            if (q.data.errors)
                throw q.data.errors.toString();

            return q.data.countryByIso;
        }).catch((e) => console.error('Failed to load country', e));
    },
    fetchCountrySuccess(country: ICountry) {
        this.countries.push(country);
    },
});

export type ICountriesStore = typeof CountriesStore.Type;