import React from 'react';
import { useRoutes } from 'react-router-dom';
import router from '@/router';
function App() {
  return <div className="App">{useRoutes(router)}</div>;
}
export default App;
