import React from 'react';
import Provider from './src/context/Provider';
import Routes from './src/routes';

export default function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}
