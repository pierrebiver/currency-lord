import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {App} from './App';
import {CountriesStore} from 'store/Country';
import {createNetworkInterface} from 'apollo-client';


import '../semantic/dist/semantic.css';
import ApolloClient from 'apollo-client/ApolloClient';
import ApolloProvider from 'react-apollo/ApolloProvider';


const networkInterface = createNetworkInterface({
    uri: 'https://31pl13pjv.lp.gql.zone/graphql'
});


const client = new ApolloClient({
    networkInterface,
    connectToDevTools: true
});


const store = {
    countriesStore: CountriesStore.create(),
};


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider {...store}>
            <App/>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root') as HTMLElement
);