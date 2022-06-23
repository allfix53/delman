import { Box, HStack, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isMenuCollapsed } from '../../../atoms/ThemeAtom'
import { useAtom } from 'jotai'

export default function SidebarMenuItem({ title, icon, redirectTo }) {
  // is page acitive
  const [isActive, setIsActive] = useState(false)
  // is current menu hovered
  const [isHovered, setIsHovered] = useState(false)

  const [menuCollapsed, setMenuCollapsed] = useAtom(isMenuCollapsed)

  const router = useRouter()
  useEffect(() => {
    setIsActive(router.pathname === redirectTo)
  }, [])

  return (
    <HStack
      position="relative"
      p={15}
      cursor="pointer"
      // effect hover => change bg menu
      bg={isHovered ? 'gray.200' : 'gray.50'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      gap={2}
      // efect hover and current page => change color
      color={isActive || isHovered ? 'blue.500' : 'gray.600'}
      // action to redirect or toggle
      onClick={() => {
        if (redirectTo == '') {
          setMenuCollapsed(!menuCollapsed)

          /*
          force set isHovered to false to prevent:
          transition From menu full wide to collapsed, 
          the menu is detected as hovered although the menu is collapsed and the cursor is not on the menu
          */
          setIsHovered(false)
        } else {
          router.push(redirectTo)
        }
      }}
    >
      <Box
        position="absolute"
        // efect hover and current page => show the marker box
        display={isActive || isHovered ? 'block' : 'none'}
        left={0}
        top={0}
        bg="blue.500"
        w="5px"
        h="full"
      />
      {icon}

      {!menuCollapsed && (
        <Box fontWeight="bold" w={150}>
          {title}
        </Box>
      )}
    </HStack>
  )
}
