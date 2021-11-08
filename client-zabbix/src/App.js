import './App.css';
import MainScreen from './screens/MainScreen'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    text: {
      primary: '#000',
      secondary: '#000',
      disabled: '#000'
    },
    primary: {
      main: '#00f000',
      contrastText: '#000'
    },
    secondary: {
      main: '#000'
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
