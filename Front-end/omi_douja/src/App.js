import './App.css';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import HomeIcon from '@mui/icons-material/Home';


function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <LoadingButton
        onClick={() => setCount(oldCount => oldCount + 2)}
        endIcon={<HomeIcon />}
        loadingPosition="end"
        variant="contained"
      >
        +1
      </LoadingButton>
      <h1>La valeur de compteur est : {count}</h1>
    </div>
  );
}

export default App;
