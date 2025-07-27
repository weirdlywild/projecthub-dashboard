import { AuthProvider } from "../src/contexts/AuthContext";
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import "../src/styles/tailwind.css";
import "../src/styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}