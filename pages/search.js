import DefaultLayout from '../components/Layout/DefaultLayout'
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Heading,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { RiErrorWarningFill, RiCloseCircleFill } from 'react-icons/ri'
import React, { useEffect, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { getAllUsers } from '../services/Users'
import UserDetailDrawer from '../components/Drawer/UserDetailDrawer'

const Search = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  })
  const { data } = useQuery('get-users', () => getAllUsers())
  const [searchResult, setSearchResult] = useState(null)

  // handle search
  const onSubmit = ({ email }) => {
    const user = data.find(
      (item) => item.email.toLowerCase() == email.toLowerCase()
    )
    setSearchResult(user)
  }

  // input search watcher
  const emailWatcher = watch('email', '')

  // drawer
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <DefaultLayout
      pageTitle="Search User"
      pageDescription="Search existing user"
      pageName="Search | Search User"
    >
      <Box w="md" h="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement>
                <BiSearch />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search by email"
                autoFocus
                {...register('email', {
                  required: 'Required',
                  minLength: { value: 3, message: 'Minimun 3 chars' },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email format',
                  },
                })}
                autoComplete="off"
              />
              {emailWatcher !== '' && (
                <InputRightElement
                  color="gray.500"
                  cursor="pointer"
                  _hover={{ color: 'red.300' }}
                  onClick={() => setValue('email', '')}
                >
                  <RiCloseCircleFill />
                </InputRightElement>
              )}
            </InputGroup>
            <FormErrorMessage>
              {errors.email && (
                <>
                  <RiErrorWarningFill />
                  {errors.email.message}
                </>
              )}
            </FormErrorMessage>
          </FormControl>
        </form>

        {/* Result section */}
        <Box
          bg="gray.100"
          borderRadius="sm"
          px={4}
          py={12}
          mt={6}
          textAlign="center"
        >
          {searchResult ? (
            <>
              <Heading as="h2">{searchResult.name}</Heading>
              <Heading as="h2" fontSize="1rem" fontWeight="normal" my={4}>
                {searchResult.email.toLowerCase()}
              </Heading>
              <Box h="1px" bg="gray.400" />
              <Button colorScheme="facebook" mt={4} onClick={onOpen}>
                View User Profile
              </Button>
            </>
          ) : (
            <>
              <Heading as="h2">No result was found</Heading>
              <p>Please try again with different email</p>
            </>
          )}
        </Box>
      </Box>

      {/* Drawer user detail */}
      {searchResult && (
        <>
          <UserDetailDrawer
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            searchResult={searchResult}
          />
        </>
      )}
    </DefaultLayout>
  )
}

export default Search
