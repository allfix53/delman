import '../styles/globals.css'
import 'react-virtualized/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/** <ReactQueryDevtools/> */}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
