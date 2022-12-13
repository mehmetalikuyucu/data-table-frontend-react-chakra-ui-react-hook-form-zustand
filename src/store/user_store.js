import create from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import axios from 'axios'

const userStore = set => ({
  users: [],

  loggedUser: {},
  
  message: '',


  fetchUsers: async () => {
   await axios
      .get('http://localhost:4000/users')
      .then(response => set(() => ({ users: response.data })))
  },


  updateUser: async (
    id,
    email,
    password,
    secondary_email,
    gsm,
    firstname,
    lastname,
    status
  ) => {
    await axios
      .put(`http://localhost:4000/user/update/${id}`, {
        email,
        password,
        lastname,
        secondary_email,
        gsm,
        firstname,
        lastname,
        status
      })
      .then(response => {
        set(() => ({
          message: `${email} sahip kullanıcı güncellendi`
        }))
      })
      .catch(e => {
        set(() => ({
          message: `bir hata oluştu`
        }))
      })
  },



  deleteUser: async id => {
    await axios
      .delete(`http://localhost:4000/user/delete/${id}`)
      .then(() => set({ message: `${id} li kullanıcı silindi` }))
      .catch(() => set({ message: 'işlem gerçekleştirilemedi' }))
  },



  addUser: async (
    email,
    password,
    secondary_email,
    gsm,
    firstname,
    lastname
  ) => {
    await axios
      .post('http://localhost:4000/user', {
        email,
        password,
        lastname,
        secondary_email,
        gsm,
        firstname,
        lastname
      })
      .then(() => set({ message: 'yeni kullanıcı oluşturuldu' }))
      .catch(() => set({ message: 'kullanıcı oluşturulamadı' }))
  },



  login: async (email, password) => {
    await axios
      .get(`http://localhost:4000/user/${email}/${password}`)
      .then(response => {
        set({ loggedUser: response.data, message: 'Giriş Yapıldı' })
      })
      .catch(() => {
        set({ message: 'Giriş yapılamadı' })
      })
  },



  logout: () => {
    set({ loggedUser: {}, message: 'çıkış yapıldı' })
  },
})
const useUserStore = create(devtools(userStore))
export default useUserStore
