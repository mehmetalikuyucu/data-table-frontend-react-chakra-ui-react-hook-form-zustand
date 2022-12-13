import { Box} from "@chakra-ui/react";
import Header from './components/header'
import DataTable from './components/data_table'
function App () {
  

  return (
    
      <Box px={2} py={6}>
      <Header></Header>
      <DataTable></DataTable>
      </Box>
    
  )
}

export default App
