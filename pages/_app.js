import '../src/styles/main.css';
import '../src/styles/tailwind.css';
import { AppProvider } from '../src/context/AppContext';
import { CartProvider } from '../src/context/CartContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AppProvider>
  );
}