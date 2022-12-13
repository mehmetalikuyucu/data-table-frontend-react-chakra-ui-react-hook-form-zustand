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
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useUserStore from '../store/user_store'

const AddUserModal = ({ onClose }) => {
  
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const { register, handleSubmit } = useForm()

  const addUser = useUserStore(state => state.addUser)

  const onSubmit = values => {
    const { email, password, secondary_email, gsm, firstname, lastname } = values
    addUser(email, password, secondary_email, gsm, firstname, lastname)
    onClose()
  }


  return (
    <ModalContent>
      <ModalHeader>Kullanıcı Ekle</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <FormControl>
            <FormLabel>
              Email
              <Input
                {...register('email', { required: true })}
                type={'email'}
                isRequired
              ></Input>
            </FormLabel>
            <FormLabel>
              Password
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  isRequired
                ></Input>
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormLabel>
            <FormLabel>
              Secondary Email
              <Input {...register('secondary_email')}></Input>
            </FormLabel>
            <FormLabel>
              Gsm
              <Input {...register('gsm')}></Input>
            </FormLabel>
            <FormLabel>
              Firstname
              <Input
                {...register('firstname', { required: true })}
                isRequired
              ></Input>
            </FormLabel>
            <FormLabel>
              Lastname
              <Input
                {...register('lastname', { required: true })}
                isRequired
              ></Input>
            </FormLabel>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' colorScheme={'blue'}>
            Kullanıcı Ekle
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  )
}

export default AddUserModal
