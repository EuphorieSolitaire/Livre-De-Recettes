package com.oufk.livrederecettes.crudapp.recettes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000"})
@RestController
public class RecetteResource {
	
	@Autowired
	private LivreRecettes livre;
	
	
	@GetMapping("/recettes")
	public List<Recette> allRecipes(){
		return livre.findAll();
	}
	
	@GetMapping("/recettes/{id}")
	public Recette oneRecipe(@PathVariable int id) {
		return livre.findRecette(id);
	}
	
	@DeleteMapping("/recettes/{id}")
	public void deleteRecipe(@PathVariable int id) {
		livre.deleteRecette(id);
	}
	
	@PostMapping("/recettes")
	public int addRecipe(@RequestBody Recette recette) {
		livre.saveOrUpdateRecette(recette);
		return recette.getId();
	}
	
	@PutMapping("/recettes/{id}")
	public void updateRecipe(@PathVariable int id, @RequestBody Recette nouvelle) {
		Recette ancienne = livre.findRecette(id);
		ancienne.setNom(nouvelle.getNomRecette());
		ancienne.setNote(nouvelle.getNote());
		ancienne.setContenu(nouvelle.getContenu());
		livre.saveOrUpdateRecette(ancienne);
	}
	
}