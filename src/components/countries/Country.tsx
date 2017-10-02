import * as React from 'react';
import {Card, Icon} from 'semantic-ui-react';
import {ICountry} from '../../store/Country';


type CountryProps = {
    country: ICountry
}

export const Country = ({country}: CountryProps) => (
    <Card>
        <Card.Content>
            <Card.Header>
                <Icon name="globe"/>,
                <span> {country.name}  </span>
            </Card.Header>
            <Card.Meta>
                {country.capital}
            </Card.Meta>

        </Card.Content>
        <Card.Content extra>
            <Icon name="users"/>
            {country.population}
        </Card.Content>
    </Card>
);

