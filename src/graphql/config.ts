import {createNetworkInterface, ApolloClient} from 'apollo-client'


const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'https://31pl13pjv.lp.gql.zone/graphql',
    })
});

export default client