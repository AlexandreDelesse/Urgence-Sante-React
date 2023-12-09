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
import CrewContext from './contexts/Crew.context'
import { ICrew } from './interfaces/ICrew'

function App() {
  const [showPastMission, setShowPastMission] = useState(false)
  const [crew, setCrew] = useState<ICrew | null>(null)
  const [hasLogged, setHasLogged] = useState(false)
  const queryClient = new QueryClient()

  const theme = createTheme({
    palette: {},
  })

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ hasLogged, setHasLogged }}>
          <CrewContext.Provider value={{ crew, setCrew }}>
            <FilterContext.Provider
              value={{ showPastMission, setShowPastMission }}
            >
              <ThemeProvider theme={theme}>
                <MainNavbarFacade />
                <AppRoutes />
              </ThemeProvider>
            </FilterContext.Provider>
          </CrewContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </HashRouter>
  )
}

export default App
