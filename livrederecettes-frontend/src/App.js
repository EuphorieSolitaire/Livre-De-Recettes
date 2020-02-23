import React, { Component } from 'react';
import LivreDeRecettesApp from './component/LivreDeRecettesApp';
import './App.css';

class App extends Component {
    render() {
        return ( 
            <div className = "container" >
                < LivreDeRecettesApp /> 
            </div>
        )
    }
}

export default App;