import {types,} from 'mobx-state-tree';
import client from 'graphql/config';

const COUNTRIES_ALL = require('graphql/CountriesAll.graphql');
import {ApolloQueryResult} from 'apollo-client';
import {IObservableArray} from 'mobx';


const Currency = types.model('Currency',
    {
        code: types.string,
        name: types.string,
        symbol: types.string
    });

const Country = types.model(
    'Country',
    {
        name: types.string,
        alpha2Code: types.string,
        currencies: types.optional(types.array(Currency), []),
        capital: types.string,
        population: types.number
    });

export type ICountry = typeof Country.Type;

export const CountriesStore = types.model({
    countries: types.optional(types.array(Country), []),
    isLoading: types.optional(types.boolean, true),
    search: types.maybe(types.string),
    get filteredCountries() {
        if (!this.search) {
            return this.countries;
        }

        return this.countries.filter((c: ICountry) => c.name.toLowerCase().includes(this.search.toLowerCase()));
    }
}, {
    afterCreate() {
        this.loadCountries();
    },
    loadCountries() {
        this.isLoading = true;
        this.fetchCountries().then((f: IObservableArray<ICountry>) => this.fetchCountriesSuccess(f));
    },
    fetchCountries(): Promise<ICountry[]> {
        return client.query({
            query: COUNTRIES_ALL
        }).then((q: ApolloQueryResult<any>) => q.data.foods)
            .catch((e) => console.error('Failed to load all countries', e));
    },
    fetchCountriesSuccess(countries: IObservableArray<ICountry>) {
        this.isLoading = false;
        this.countries = countries;
    },
});

export type ICountriesStore = typeof CountriesStore.Type;