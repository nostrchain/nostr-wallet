
import './App.css';
import logo from './logo.svg';
import PrivateImputPage from './page/login'
import InfoPage from './page/info'
import SendPage from './page/send'
import { Route,Routes  } from 'react-router-dom'


import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;


function App() {
  return (
    <div className="App">

      <Routes>
          <Route index element={<PrivateImputPage />} />
          <Route path="info/:npub" element={<InfoPage />} />
          <Route path="send" element={<SendPage />} />
          <Route path="*" element={<PrivateImputPage />} /> 
      </Routes>

    </div>
  );
}

export default App;
