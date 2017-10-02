import * as React from 'react';
import {Route, Router} from 'react-router';
import createHashHistory from 'history/createHashHistory';
import CountryList from 'components/countries/CountryList';
import {Segment} from 'semantic-ui-react';
import Search from 'components/countries/Search';


const Main = () => (
    <div>
        <Segment>
            <Search/>
        </Segment>,
        <CountryList/>
    </div>
);


export const App = () => (
    <Router history={createHashHistory()}>
        <Route path="/" render={Main}/>
    </Router>
);