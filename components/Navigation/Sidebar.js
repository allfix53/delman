import { VStack, Icon } from '@chakra-ui/react'
import { MdSpaceDashboard } from 'react-icons/md'
import { HiMenuAlt2, HiUsers, HiUserAdd, HiSearch } from 'react-icons/hi'
import SidebarMenuItem from './Sidebar/SidebarMenuItem'

export default function Sidebar() {
  return (
    <VStack
      bg="gray.50"
      alignItems="flex-start"
      borderRight="1px"
      borderColor="gray.300"
    >
      <SidebarMenuItem
        icon={<Icon as={HiMenuAlt2} w={6} h={6} />}
        title="Menu"
        redirectTo=""
      />
      <SidebarMenuItem
        icon={<Icon as={MdSpaceDashboard} w={6} h={6} />}
        title="Dashboard"
        redirectTo="/"
      />
      <SidebarMenuItem
        icon={<Icon as={HiUsers} w={6} h={6} />}
        title="Users"
        redirectTo="/users"
      />
      <SidebarMenuItem
        icon={<Icon as={HiUserAdd} w={6} h={6} />}
        title="Registration"
        redirectTo="/register"
      />
      <SidebarMenuItem
        icon={<Icon as={HiSearch} w={6} h={6} />}
        title="Search"
        redirectTo="/search"
      />
    </VStack>
  )
}
