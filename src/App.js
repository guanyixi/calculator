import './App.css';

import {useState} from 'react';
import  BarChart from './components/BarChart';
import  Form from './components/Form';

function App() {

  const [data, setData] = useState();
   
  return (
    <div className="App">
      <header className="App-header">
        <h1>Investment Calculator</h1>
        <p>Proof of concept, not for production.</p>
      </header>
      <main>
        
        <div className="container">
          <Form
              data = {data}
              setData = {setData}
          />
          <div className="charts">
            <div className="chart">
              {data &&
                <BarChart 
                data={data}
                />
              }
            </div>
          </div>
          
        </div>
      </main>
      <footer>
        <p>Libraries: <a href="https://reactjs.org" target="_blank">react</a> + <a href="https://react-chartjs-2.js.org/" target="_blank">react-chartjs-2</a></p>
        <p>By Brooklyn Guan on Jan 28th, 2023</p>
      </footer>
    </div>
  );
}

export default App;
