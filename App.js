import React from 'react';
import Home from './src/pages/Home';
import Provider from './src/context/Provider';

export default function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}
