import { useState } from 'react';
import './styles/Base.css';
import HomePage from './components/HomePage';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <Loader
        onLoadComplete={() => {
          setIsLoading(false);
        }}
      />
    );
  }

  return <HomePage />;
}

export default App;
