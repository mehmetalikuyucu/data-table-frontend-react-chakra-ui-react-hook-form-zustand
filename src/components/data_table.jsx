import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import useUserStore from "../store/user_store";
import UpdateUserModal from "./update_user_modal";
import { useState } from "react";
import useRolesPermissionsStore from "../store/roles_and_permissions_store";

const DataTable = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [id, setId] = useState();
  const toast = useToast();
  const message = useUserStore((state) => state.message);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const loggedUser = useUserStore((state) => state.loggedUser);
  const userPermissions = useRolesPermissionsStore(state => state.userPermissions.map((permission) => permission.permission_id))
  const tableHeads = [
    "USER_ID",
    "EMAIL",
    "PASSWORD",
    "SECONDARY_EMAIL",
    "GSM",
    "FIRSTNAME",
    "LASTNAME",
    "LOCALE",
    "TIMEZONE",
    "STATUS",
    "CREATED_AT",
    "UPDATED_AT",
  ];

  const showToast = (message) => {
    toast({
      title: "Message",
      description: message,
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchUsers();
    showToast(message);
  }, [message]);
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {Object.keys(loggedUser).length !== 0 && userPermissions.includes('USER_ACCOUNT_READ_PAGE')&& (
        
        <>
          <Table mt={6} size={"sm"} fontSize={"smaller"}>
            <Thead>
              <Tr>
                {tableHeads.map((head, index) => (
                  <Th px={2} key={index}>
                    {head}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <>
                  <Tr>
                    <HStack>
                      {userPermissions.includes('USER_ACCOUNT_UPDATE_PAGE') && <IconButton
                        shadow={"lg"}
                        size={"xs"}
                        icon={<EditIcon></EditIcon>}
                        onClick={() => {
                          onOpen();
                          setId(user.user_id);
                        }}
                        colorScheme={"blue"}></IconButton>}
                      {userPermissions.includes('USER_ACCOUNT_DELETE_PAGE')&&<IconButton
                        shadow={"lg"}
                        size={"xs"}
                        colorScheme={"red"}
                        onClick={() => {
                          deleteUser(user.user_id);
                        }}
                        icon={<DeleteIcon></DeleteIcon>}></IconButton>}
                    </HStack>
                  </Tr>
                  <Tr key={index}>
                    {Object.values(user).map((value, index) => (
                      <Td key={index} px={2}>
                        {value}
                      </Td>
                    ))}
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
          <Modal isOpen={isOpen} onClose={onClose} onOverlayClick isCentered>
            <ModalOverlay>
              <UpdateUserModal id={id} onClose={onClose}></UpdateUserModal>
            </ModalOverlay>
          </Modal>
        </>
      )}
    </>
  );
};

export default DataTable;
