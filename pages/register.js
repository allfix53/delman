import DefaultLayout from '../components/Layout/DefaultLayout'
import {
  Progress,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Button,
  useToast,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RiErrorWarningFill } from 'react-icons/ri'
import Router, { useRouter } from 'next/router'
import { createUsers } from '../services/Users'

const Home = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  })

  const toast = useToast()
  const onSubmit = (data) => {
    createUsers(data).then((response) => {
      if (response.data) {
        toast({
          title: 'A new user created.',
          description: `User with email ${response.data.email} created.`,
          status: 'success',
          duration: 1500,
          isClosable: true,
          position: 'top-right',
          onCloseComplete: () => {
            Router.push('/users')
          },
        })
      } else {
        toast({
          title: 'Create user Failed!',
          description: response.response?.data?.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
          variant: 'left-accent',
        })
      }
    })
  }

  return (
    <DefaultLayout
      pageTitle="User Registration "
      pageDescription="Add new User"
      pageName="Register | Add new User"
    >
      <Box w={72} h="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input name */}
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              placeholder="Name"
              {...register('name', {
                required: 'Required',
                minLength: { value: 3, message: 'Minimun 3 chars' },
              })}
              autoComplete="off"
              autoFocus
            />
            <FormErrorMessage>
              {errors.name && (
                <>
                  <RiErrorWarningFill />
                  {errors.name.message}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          {/* input email */}
          <FormControl isInvalid={errors.email} pt="6">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              {...register('email', {
                required: 'Required',
                minLength: { value: 3, message: 'Minimun 3 chars' },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please provide a valid email',
                },
              })}
              autoComplete="off"
            />
            <FormErrorMessage>
              {errors.email && (
                <>
                  <RiErrorWarningFill />
                  {errors.email.message}
                </>
              )}
            </FormErrorMessage>
          </FormControl>

          <Flex pt="6">
            <Spacer />
            <Button type="submit" colorScheme="blue">
              Submit User
            </Button>
          </Flex>
        </form>
      </Box>
    </DefaultLayout>
  )
}

export default Home
