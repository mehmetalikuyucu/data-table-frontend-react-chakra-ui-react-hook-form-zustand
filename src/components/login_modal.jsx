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
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUserStore from "../store/user_store";

const LoginModal = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const { register, reset, handleSubmit } = useForm();
  const login=useUserStore(state=>state.login)
  const onSubmit = (values) => {
    const { email, password } = values
    login(email,password)
    onClose();
  };
  return (
    <ModalContent>
      <ModalHeader>Giriş Yap</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormControl>
            <FormLabel>
              Email
              <Input
                {...register("email", { required: true })}
                type={"email"}
              isRequired></Input>
            </FormLabel>
            <FormLabel>
              Password
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true })}
                  isRequired></Input>
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type='submit'>Giriş yap</Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
};

export default LoginModal;
