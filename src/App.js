import logo from './logo.svg';
import './App.css';

import {useState} from 'react';
import  BarChart from './components/BarChart';
import  Form from './components/Form';

function App() {

  const [data, setData] = useState();
   
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <h1>Investment Calculator</h1>
        <div className="container">
          <Form
              data = {data}
              setData = {setData}
          />
          <div className="chart">
            {data &&
              <BarChart 
              data={data}
              />
            }
          </div>
        </div>
      </main>
      <footer>Brooklyn Guan | Jan 29th, 2023</footer>
    </div>
  );
}

export default App;
