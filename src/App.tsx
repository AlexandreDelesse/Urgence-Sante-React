import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './routing/AppRoutes'
import UserContext from './contexts/User.context'
import { QueryClient, QueryClientProvider } from 'react-query'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import FilterContext from './contexts/Filter.context'
import { ThemeProvider, createTheme } from '@mui/material'
import MainNavbarFacade from './components/nav/mainNavbar/MainNavbarFacade'
import ILoginResponse from './interfaces/ILoginResponse'
import PageContent from './pages/pageContent/PageContent'

function App() {
  const [showPastMission, setShowPastMission] = useState(false)
  const [hasLogged, setHasLogged] = useState(false)
  const [crew, setCrew] = useState<ILoginResponse | null>(null)

  const getToken = () => crew?.token || null
  const queryClient = new QueryClient()

  const theme = createTheme({
    palette: {},
  })

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{ hasLogged, setHasLogged, crew, setCrew, getToken }}
        >
          <FilterContext.Provider
            value={{ showPastMission, setShowPastMission }}
          >
            <ThemeProvider theme={theme}>
              <MainNavbarFacade />
              <PageContent>
                <AppRoutes />
              </PageContent>
            </ThemeProvider>
          </FilterContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </HashRouter>
  )
}

export default App
