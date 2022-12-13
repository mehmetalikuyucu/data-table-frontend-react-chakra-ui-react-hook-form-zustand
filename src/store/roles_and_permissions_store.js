import create from 'zustand'
import { devtools } from 'zustand/middleware'
import axios from 'axios'

const useRolesPermissionsStore = create(
  devtools(set => ({
      message: '',
      
      userPermissions: [],
    
      roles: [],
    
    fetchRoles: () => {
      axios
        .get('http://localhost:4000/roles')
        .then(response => set({ roles: response.data }))
        .catch(() => set({ message: 'roller yüklenmedi' }))
      },
    
    /* addRoleToUser: (user_id, role_id) => {
      axios
        .post('http://localhost:4000/user_roles', { user_id, role_id })
        .then(() =>
          set({ message: `${user_id} başarılı bir şekilde rol verildi` })
        )
        .catch(() => set({ message: `${user_id} rol verilemedi` }))
      }, */
    
    fetchUserPermissions: async user_id => {
      await axios
        .get(`http://localhost:4000/user/permissions/${user_id}`)
        .then(response => {
          set({ userPermissions: response.data, message: 'izinler geldi' })
        })
        .catch(() => {
          set({ message: 'izinler gelemedi' })
        })
      }
    
    
    
  }))
)
export default useRolesPermissionsStore
