import * as React from 'react';
import {ICountriesStore} from 'store/Country';
import {Input, Icon, Label} from 'semantic-ui-react/';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';


type AmountConverterProps = {
    countriesStore: ICountriesStore
}

const AmountConverter = ({countriesStore}: AmountConverterProps) => (
    <Input labelPosition="right" placeholder="Amount" type="number"
           onChange={(event, data) => countriesStore.calculateAmount(data.value)}>
        <Label>Kr</Label>
        <input/>
    </Input>
);


export default compose<AmountConverterProps, {}>(inject('countriesStore'),
    observer)(AmountConverter);