import './App.css';
import MainScreen from './screens/MainScreen'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00f000'
    },
    secondary: {
      main: '#fff'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainScreen />
      </div>
    </ThemeProvider>
  );
}

export default App;
