import {
  Box,
  Heading,
  Button,
  Flex,
  // modal
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Center,
  useToast,
} from '@chakra-ui/react'
import Router from 'next/router'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { useMutation } from 'react-query'
import { deleteUser } from '../../services/Users'

export default function DeleteUserConfirmationModal({
  isOpen,
  onOpen,
  onClose,
  userDetail,
}) {
  const mutationOnDeleteUser = useMutation((idUser) => {
    toast({
      title: 'User deleted.',
      description: 'Success to delete user.',
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'top-right',
      onCloseComplete: () => {
        Router.push('/users')
      },
    })
    onclose()
    return deleteUser(idUser)
  })

  const toast = useToast()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Center>
            <Box bg="gray.100" p="4" rounded="full">
              <RiDeleteBin2Line size={50} />
            </Box>
          </Center>

          <Center>
            <Heading as="h2" fontSize="xl">
              Are you sure you want this user ?
            </Heading>
          </Center>

          <Center fontSize="sm">
            This action will delete: {userDetail.name} from the database
          </Center>
        </ModalBody>

        <ModalFooter>
          <Flex gap={4} w="full">
            <Button
              flex={1}
              colorScheme="gray"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              variant="solid"
              colorScheme="red"
              onClick={() => {
                mutationOnDeleteUser.mutate(userDetail.id)
              }}
            >
              Delete User
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
