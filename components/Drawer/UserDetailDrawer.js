import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  Heading,
  Flex,
  Box,
  Button,
  Spacer,
  useDisclosure,
  DrawerOverlay,
} from '@chakra-ui/react'
import DeleteUserConfirmationModal from '../Modal/DeleteUserConfirmationModal'

export default function UserDetailDrawer({
  isOpen,
  onOpen,
  onClose,
  searchResult,
}) {
  // data normalizarion for user properties
  const normalize = (word) => {
    const remove_ = word.replaceAll('_', ' ')
    return remove_.charAt(0).toUpperCase() + remove_.slice(1)
  }

  // modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <DrawerContent bg="gray.50">
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor="gray.300">
            <Heading as="h2">User Details</Heading>
            <Heading as="h2" fontWeight="normal" fontSize="sm">
              This is inquiry about user with email:{' '}
              {searchResult.email.toLowerCase()}
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            {Object.keys(searchResult).map((item, key) => (
              <Flex key={key} w="full">
                <Box w={32} flex={'initial'}>
                  {normalize(item)}
                </Box>
                <Box flex={1} textOverflow="ellipsis" overflowWrap={'anywhere'}>
                  : {searchResult[item]}
                </Box>
              </Flex>
            ))}
          </DrawerBody>

          <DrawerFooter borderTop="2px" borderColor="gray.500">
            <Flex w="full">
              <Button
                colorScheme="blackAlpha"
                variant="link"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Spacer />
              <Button colorScheme="red" onClick={() => onModalOpen()}>
                Delete User
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Delete modal */}
      <DeleteUserConfirmationModal
        isOpen={isModalOpen}
        onOpen={onModalOpen}
        onClose={onModalClose}
        userDetail={searchResult}
      />
    </>
  )
}
