import React, {Component} from 'react';
import LivreDeRecettesComponents from './LivreDeRecettesComponents';
import '../App.css';

class LivreDeRecettesApp extends Component {
  render() {
    return(
      <>
      <div className="header">
      <br/><h1>*** Livre De Recettes ***</h1><br/>
      </div>
      <div className="container-components"><LivreDeRecettesComponents />
      </div>
      </>
    )
  }
}

export default LivreDeRecettesApp;