import { ProviderAuth } from '@hooks/useAuth';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import MainLayout from '@layout/MainLayout';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}
