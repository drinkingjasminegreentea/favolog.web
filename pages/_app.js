import Layout from '../components/layout/Layout'
import { AuthContextProvider } from '../src/AuthContext'
import { PageContextProvider } from '../src/PageContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <PageContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
