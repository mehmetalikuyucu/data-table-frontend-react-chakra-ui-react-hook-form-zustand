import {
  Flex,
  Text,
  Button,
  useDisclosure,
  HStack,
  Modal,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import useUserStore from "../store/user_store";
import AddUserModal from "./add_user_modal";
import LoginModal from "./login_modal";
import { useEffect } from "react";
import useRolesPermissionsStore from "../store/roles_and_permissions_store";

const Header = () => {

  const [modal, setModal] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = useUserStore((state) => state.logout);
  const loggedUser = useUserStore((state) => state.loggedUser);

  const fetchUserPermissions = useRolesPermissionsStore(state => state.fetchUserPermissions)
  const message=useRolesPermissionsStore(state=>state.message)
  const userPermissions = useRolesPermissionsStore(state => state.userPermissions.map((permission)=>permission.permission_id))

  useEffect(() => {
    fetchUserPermissions(loggedUser.user_id)
  }, [loggedUser,message])
  


  return (
    <>
      <Flex alignItems='center' justifyContent='space-between'>
        <Text fontWeight='bold' fontSize='xl'>
          Kullanıcı Tablosu
        </Text>
        <HStack spacing={2}>
          <Button
            colorScheme='blue'
            size='md'
            onClick={() => {
              setModal(<LoginModal onClose={onClose}></LoginModal>);
              if (Object.keys(loggedUser).length === 0) {
                onOpen();
              } else {
                logout();
              }
            }}>
            {Object.keys(loggedUser).length === 0 ? "Giriş Yap" : "Çıkış Yap"}
          </Button>
          {Object.keys(loggedUser).length !== 0 && userPermissions.includes('USER_ACCOUNT_CREATE_PAGE') && (
            <Button
              colorScheme={"teal"}
              size='md'
              onClick={() => {
                setModal(<AddUserModal onClose={onClose}></AddUserModal>);
                onOpen()
              }}>
              Yeni Kullanıcı
            </Button>
          )}
        </HStack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='5px'></ModalOverlay>
        {modal}
      </Modal>
    </>
  );
};

export default Header;
