import { AuthProvider } from "../src/contexts/AuthContext";
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import AuthMiddleware from '../src/components/AuthMiddleware';
import "../src/styles/tailwind.css";
import "../src/styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AuthMiddleware>
          <Component {...pageProps} />
        </AuthMiddleware>
      </AuthProvider>
    </Provider>
  );
}