import axios from 'axios';
const LIVRE_RECETTES_API_URL = 'http://localhost:8080/recettes';

class RecetteDataService {
  retrieveAllRecipes() {
    return axios.get(`${LIVRE_RECETTES_API_URL}`)
  }
  deleteRecipe(id) {
    return axios.delete(`${LIVRE_RECETTES_API_URL}/${id}`)
  }
  addRecipe(recette) {
    return axios.post(`${LIVRE_RECETTES_API_URL}`, recette);
  }
  updateRecipe(id, recette) {
    return axios.put(`${LIVRE_RECETTES_API_URL}/${id}`, recette);
  }
}

export default new RecetteDataService();
