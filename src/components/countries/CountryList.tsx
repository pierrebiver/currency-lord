import * as React from 'react';
import {ICountriesStore} from '../../store/Country';
import {Loader, Grid} from 'semantic-ui-react';
import {Country} from './Country';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';


type CountryListProps = {
    countriesStore: ICountriesStore
}

const CountryList = ({countriesStore}: CountryListProps) => (
    <Grid columns={4}>
        {countriesStore.countries.map(c => <Grid.Column key={c.alpha2Code} children={<Country country={c}/>}/>)}
    </Grid>
);


export default compose<CountryListProps, {}>(
    inject('countriesStore'),
    observer
)(CountryList);