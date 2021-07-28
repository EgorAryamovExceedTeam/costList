import "../styles/globals.css";
import { HomeProvider } from "../context/HomeContext";
import { ApolloProvider } from "@apollo/client";
import client from "../api/api";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <HomeProvider>
        <Component {...pageProps} />
      </HomeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
