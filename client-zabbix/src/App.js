import './App.css';
import MainScreen from './screens/MainScreen'
import { makeStyles } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00f000'
    },
    secondary: {
      main: '#181818'
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
