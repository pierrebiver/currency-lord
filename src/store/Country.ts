import {types,} from 'mobx-state-tree';
import client from 'graphql/config';

const COUNTRY_SELECT = require('graphql/CountrySelect.graphql');
import {ApolloQueryResult} from 'apollo-client';


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
    }
);

export type ICountry = typeof Country.Type;

export const CountriesStore = types.model({
    countries: types.optional(types.array(Country), []),
    amountSEK: types.maybe(types.number)
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
    calculateAmount(amount: string) {
        const convertedAmount = parseFloat(amount);
        if (isNaN(convertedAmount))
            return; // Do nothing, we could think of display an error message on the input.

        this.countries.forEach((c: ICountry) => {
            //c.setAmount(c.currency.rateSEK * convertedAmount);
        });
        console.log(this.countries.forEach((c: ICountry) => c.convertedFromSEK));
    }
});

export type ICountriesStore = typeof CountriesStore.Type;