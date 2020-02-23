import React, {Component} from 'react';
import RecetteDataService from '../service/RecetteDataService';

class LivreDeRecettesComponents extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : [],
    }
    this.refreshRecipes = this.refreshRecipes.bind(this)
    this.addRecipes = this.addRecipes.bind(this)
    this.deleteRecipeClicked = this.deleteRecipeClicked.bind(this)
    this.displayAddFields = this.displayAddFields.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.updateButtonClicked = this.updateButtonClicked.bind(this)
    this.confirmButtonClicked = this.confirmButtonClicked.bind(this)
    this.enableButtons = this.enableButtons.bind(this)
    this.disableButtons = this.disableButtons.bind(this)
  }
  componentDidMount(){
    this.refreshRecipes();
  }
  refreshRecipes(){
    RecetteDataService.retrieveAllRecipes()
      .then(
        response => {
          this.setState({data : response.data})
        }
      )
  }
  addRecipes(recette){
    RecetteDataService.addRecipe(recette)
    .then(
      response => {
        this.refreshRecipes()
      }
    )
  }
  deleteRecipeClicked(id) {
    RecetteDataService.deleteRecipe(id)
      .then(
        response => {
          this.refreshRecipes()
        }
      )
  }
  updateRecipes(id, recette) {
    RecetteDataService.updateRecipe(id, recette)
      .then(
        response => {
          this.refreshRecipes()
        }
      )
  }

  /*
  This function is called when a user tries to submit a recipe
  If the name field is empty, submitting won't work.
  */
  onSubmit() {
    var e = document.getElementById("tr");
    var name = document.getElementById("namefield");
    if (name.value === "") {
      e.parentNode.removeChild(e);
      this.enableButtons();
      document.getElementById("add-button").style.visibility = "visible";
      return;
    } else {
        var desc = document.getElementById("descfield");
        var note = document.getElementById("notefield");
        var object = { nomRecette: name.value, note: note.value, contenu: desc.value};
      this.addRecipes(object);
      e.parentNode.removeChild(e);
      this.enableButtons();
      document.getElementById("add-button").style.visibility = "visible";
    }
  }

 /*
  This function is called when the user wants to update a recipe
  The content of the chosen recipe then becomes editable
  */ 
  updateButtonClicked(id) {
    document.getElementById("add-button").style.visibility = "hidden";
    document.getElementById("confirm-button").style.visibility = "visible";
    document.getElementById(String(id)).contentEditable = "true";
    document.getElementById("desc-td-"+id).contentEditable = "true";
    document.getElementById("note-td-"+id).contentEditable = "true";
    this.disableButtons();
  }

  /*
  This function is called when the user wants to submit the edited recipe.
  */
  confirmButtonClicked() {
    var names = document.getElementsByName("name");
    var descs = document.getElementsByName("desc");
    var notes = document.getElementsByName("note");
    for (let index = 0; index < names.length; index++) {
      if (names[index].contentEditable === "true") {
        names[index].contentEditable = "false";
        descs[index].contentEditable = "false";
        notes[index].contentEditable = "false";
        var object = { nomRecette: names[index].innerText, note: parseInt(notes[index].innerText), contenu: descs[index].innerText};
        this.updateRecipes(parseInt(names[index].id), object);
      }
    }
    this.enableButtons();
    document.getElementById("confirm-button").style.visibility = "hidden";
    document.getElementById("add-button").style.visibility = "visible";          
  }

    /*
  This function is called when the user clicks on the button "Ajouter"
  */
 displayAddFields() {
  // Checking if the new <tr></tr> to add a recipe is already being displayed. If not, disable / hide the other buttons, and create one 
  if (document.getElementById("tr")) {
    return;
  }
  document.getElementById("add-button").style.visibility = "hidden";
  this.disableButtons();
  var tr = document.createElement("tr");
  tr.id = "tr";

  // Creating the input field to enter the name of the recipe
  var nameField = document.createElement("input");
  nameField.id = "namefield";
  nameField.className = "form-control";
  nameField.type = "text";
  nameField.name = "nom";

  // Creating the input field to enter the content of the recipe
  var descField = document.createElement("textarea");
  descField.id = "descfield";
  descField.className = "form-control";
  descField.name = "description";
  descField.rows = 1;

  // Creating the input field to enter the rating of  the recipe
  var noteField = document.createElement("input");
  noteField.id = "notefield";
  noteField.className = "form-control";
  noteField.type = "number";
  noteField.name = "note";

  // Creating the submit button
  var submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.id = "btt1";
  submitButton.alt = "Submit";
  submitButton.className = "btn btn-success";
  submitButton.appendChild(document.createTextNode("Confirmer"));
  submitButton.onclick = this.onSubmit;
  
  // Adding the previously created fields to the new row
  document.getElementById("tbody").appendChild(tr);
  var td1 = document.createElement("td");
  td1.id = "td-name";
  tr.appendChild(td1);
  td1.appendChild(nameField);
  var td2 = document.createElement("td");
  td2.id = "td-desc";
  tr.appendChild(td2);
  td2.appendChild(descField);
  var td3 = document.createElement("td");
  td3.id = "td-note";
  tr.appendChild(td3);
  td3.appendChild(noteField);
  var td4 = document.createElement("td");
  td4.id = "td-submit";
  tr.appendChild(td4);
  td4.appendChild(submitButton);
}
  /*
  Disables the buttons
  Désactive les boutons
  */
  disableButtons() {
    var buttons = document.getElementsByClassName("btn btn-outline-warning");
    var buttons2 = document.getElementsByClassName("btn btn-outline-info");
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].disabled = true;
      buttons2[index].disabled = true;
    }
  }
  /*
  Enables the buttons
  Active les boutons
  */
  enableButtons() {
    var buttons = document.getElementsByClassName("btn btn-outline-warning");
    var buttons2 = document.getElementsByClassName("btn btn-outline-info");
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].disabled = false;
      buttons2[index].disabled = false;
    }
  }


  render() {
    return(
      <>
      <div className = "container-table" id="inner">
      <table className="table">
          <thead className="thead">
              <tr>
                  <th className="text-center">Recette</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Note</th>
                  <th className="text-center">Delete</th>
                  <th className="text-center">Update</th>
              </tr>
          </thead>
          <tbody id="tbody">
          {    
                this.state.data.map(
                    recette =>
                        <tr key={recette.id}>
                            <td name="name" className="text-center" id={recette.id}>{recette.nomRecette}</td>
                            <td name="desc" id={"desc-td-"+recette.id}>{recette.contenu}</td>
                            <td name="note" className="text-center" id={"note-td-"+recette.id}>{recette.note}</td>
                            <td><button type="button" id="delete-button" className="btn btn-outline-warning" onClick={() =>this.deleteRecipeClicked(recette.id)}>Supprimer</button></td>
                            <td><button type="button" id="update-button" className="btn btn-outline-info" onClick={() => this.updateButtonClicked(recette.id)}>Update</button></td>
                        </tr>
                )
          }
          </tbody>
      </table>
      <button type="button" className="btn btn-outline-success" id="add-button" alt="Ajouter" onClick={() => this.displayAddFields()}>Ajouter</button>
      <button type="button" className="btn btn-info" id="confirm-button" alt="Confirmer" style={{visibility:'hidden'}} onClick={() => this.confirmButtonClicked()}>Confirmer</button>
      </div>
      <div id="bottom">
        <br/><br/>
      </div>
      </>
    );
  }

}

export default LivreDeRecettesComponents;
