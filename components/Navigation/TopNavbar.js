import { Flex, Heading, Spacer, Center } from '@chakra-ui/react'

export default function TopNavbar() {
  return (
    <Flex bg="white" w="full" borderBottom="1px" borderColor="gray.300" p={4}>
      <Heading as="h3" size="md">
        delman.io
      </Heading>
      <Spacer />
      <Center fontStyle="italic" fontSize="sm">
        by: alfisetyadi@gmail.com
      </Center>
    </Flex>
  )
}
