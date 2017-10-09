import * as React from 'react';

const COUNTRIES_ALL = require('graphql/CountriesAll.graphql');

import {graphql, ChildProps} from 'react-apollo';
import {Select, SelectProps} from 'semantic-ui-react';
import {compose} from 'recompose';
import {inject} from 'mobx-react';
import {ICountriesStore} from '../../store/Country';
import {SyntheticEvent} from 'react';


type SearchProps = {
    countriesStore: ICountriesStore
}


type SearchPropsHandlers = SearchProps & {
    onAddItem: (event: SyntheticEvent<any>, data: SelectProps) => void,
    onRemoveItem: (event: SyntheticEvent<any>, data: SelectProps) => void
}

const Search = ({data, countriesStore}: ChildProps<SearchPropsHandlers, any>) => {
    const onChange = (event: SyntheticEvent<any>, data: SelectProps) => countriesStore.updateCountries(data.value as string[]);
    return <Select options={data.countries} loading={data.loading} multiple search onChange={onChange}/>;
};

export default compose<ChildProps<SearchProps, any>, {}>(
    inject('countriesStore'),
    graphql(COUNTRIES_ALL),
)(Search);
