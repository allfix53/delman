import {
  Container,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react'
import Head from 'next/head'
import { MdSpaceDashboard } from 'react-icons/md'
import Sidebar from '../Navigation/Sidebar'
import TopNabbar from '../Navigation/TopNavbar'

export default function DefaultLayout({
  pageTitle = 'Default Title',
  pageDescription = 'Default description',
  pageName = 'Default Page Name',
  children,
}) {
  return (
    <>
      <Head>
        <title>{pageName}</title>
      </Head>
      <Container maxW="full" p={0} h="100vh" bg="white">
        <Flex w="full" h="full" flexDirection="column">
          <TopNabbar />

          <Flex flex="1">
            {/* Sidebar */}
            <Sidebar />

            {/* Page Title */}
            <Flex flex={1} p={0} bg="white" maxW="full" flexDirection="column">
              <Box
                w="full"
                px={4}
                py={2}
                borderBottom="1px"
                borderBottomColor="gray.300"
              >
                <Heading as="h3" fontSize="1.6rem">
                  {pageTitle}
                </Heading>
                <Box color="blue.600" fontSize=".8rem" fontWeight="semibold">
                  {pageDescription}
                </Box>
              </Box>

              <Flex
                flex={1}
                maxH="80vh"
                overflowY="auto"
                maxW="full"
                bg="white"
                p={4}
              >
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
