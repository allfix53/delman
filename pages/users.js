import DefaultLayout from '../components/Layout/DefaultLayout'
import { getAllUsers } from '../services/Users'
import { Progress, Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import React, { useEffect, useRef, useState } from 'react'
import RWSalesTable from '../components/ReactWindowTable/RWSalesTable'
import { Column, Table } from 'react-virtualized'
import RWSalesTableNew from '../components/ReactWindowTable/RWSalesTableNew'
import DefaultTable from '../components/ReactWindowTable/DefaultTable'

const Home = () => {
  const { isLoading, data } = useQuery('get-users', () => getAllUsers())
  const ref = useRef()

  return (
    <DefaultLayout
      pageTitle="Sales Dashboard"
      pageDescription="List of Sales Data"
      pageName="Dashboard | Sales Data"
    >
      <Box ref={ref} w="full" h="full">
        {isLoading ? (
          <Progress h={500} w="full" colorScheme="cyan" isIndeterminate />
        ) : (
          // <RWSalesTableNew data={data} />
          <DefaultTable data={data} />
        )}
      </Box>
    </DefaultLayout>
  )
}

export default Home
