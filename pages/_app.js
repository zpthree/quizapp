import 'isomorphic-unfetch';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import PropTypes from 'prop-types';
import withData from '@lib/withData';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  apollo: PropTypes.object.isRequired,
};

export default withData(MyApp);
