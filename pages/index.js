import 'isomorphic-unfetch';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { endpoint } from '../config';

const httpLink = new HttpLink({
  uri: endpoint,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

client
  .query({
    query: gql`
      {
        allQuizzes {
          id
          title
        }
      }
    `,
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));

export default function HomePage() {
  return <div>Hello</div>;
}
