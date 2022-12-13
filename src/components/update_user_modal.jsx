import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../store/user_store";

const UpdateUserModal = ({ id, onClose }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
  const updateUser = useUserStore((state) => state.updateUser);
  const user=useUserStore(state=>state.users.find(user=>user.user_id===id))
  const { register, handleSubmit } = useForm();

  const onSubmit = (values) => {
    const { email, password, secondary_email, gsm, firstname, lastname,status } =values;
    updateUser(id, email, password, secondary_email, gsm, firstname, lastname, status);
      onClose();
  };
  return (
    <ModalContent>
      <ModalHeader>{`${id} Kullanıcı Düzenle`}</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormControl>
            <FormLabel>
              Email
              <Input
                {...register("email", { required: true })}
                type={"email"}
                isRequired
                defaultValue={user.email}></Input>
            </FormLabel>
            <FormLabel>
              Password
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  {...register("password", { required: true })}
                  defaultValue={user.password}
                  isRequired></Input>
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormLabel>
            <FormLabel>
              Secondary Email
              <Input defaultValue={user.secondary_email}
                {...register("secondary_email")}
                 ></Input>
            </FormLabel>
            <FormLabel>
              Gsm
              <Input {...register("gsm")} defaultValue={user.gsm}></Input>
            </FormLabel>
            <FormLabel>
              Firstname
              <Input
                {...register("firstname", { required: true })}
                defaultValue={user.firstname}
                isRequired></Input>
            </FormLabel>
            <FormLabel>
              Lastname
              <Input
                {...register("lastname", { required: true })}
                defaultValue={user.lastname}
                isRequired></Input>
            </FormLabel>
            <FormLabel>
              Status
              <Select
                {...register("status", { required: true })}
                defaultValue={user.status}>
                <option value='INACTIVE'>INACTIVE</option>
                <option value='ACTIVE'>ACTIVE</option>
              </Select>
            </FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type='submit'
          
           colorScheme={"blue"}>
            Düzenle
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
};

export default UpdateUserModal;
