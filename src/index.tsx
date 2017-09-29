import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {App} from './App';
import {CountriesStore} from 'store/Country';


import '../semantic/dist/semantic.css';


const store = {
    countriesStore: CountriesStore.create(),
};


ReactDOM.render(
    <Provider {...store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);