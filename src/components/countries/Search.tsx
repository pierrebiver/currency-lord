import * as React from 'react';

const COUNTRIES_ALL = require('graphql/CountriesAll.graphql');

import {graphql, ChildProps} from 'react-apollo';
import {Select, SelectProps} from 'semantic-ui-react';
import {compose, withHandlers} from 'recompose';
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

const handlers = withHandlers({
    onAddItem: ({countriesStore}: SearchProps) => (event: SyntheticEvent<any>, data: SelectProps) => countriesStore.loadCountry(data.value),
    onRemoveItem: ({countriesStore}: SearchProps) => (event: SyntheticEvent<any>, data: SelectProps) => countriesStore
});

const Search = ({data, onAddItem}: ChildProps<SearchPropsHandlers, any>) => {
    return <Select options={data.countries} loading={data.loading} multiple search onAddItem={onAddItem}/>
};

export default compose<ChildProps<SearchProps, any>, {}>(
    graphql(COUNTRIES_ALL),
    inject('countriesStore'),
    handlers
)(Search);