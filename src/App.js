import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EptScreen from './screens/EptScreen';



class App extends React.Component {


  render(){


    return (

      <BrowserRouter>
        <div className="App">
            <main>
                <Route path="/" component={EptScreen}></Route>
            </main>
        </div>
        </BrowserRouter>
    );

  }


}



export default App;
