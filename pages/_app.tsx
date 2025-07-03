import '../src/styles/main.css';
import '../src/styles/tailwind.css';
import { AppProvider } from '../src/context/AppContext';
import { CartProvider } from '../src/context/CartContext';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AppProvider>
  );
}
