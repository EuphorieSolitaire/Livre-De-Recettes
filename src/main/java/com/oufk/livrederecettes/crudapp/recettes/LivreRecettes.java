package com.oufk.livrederecettes.crudapp.recettes;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LivreRecettes {
	@Autowired
	private RecetteRepository recetteRepository;
	
	public List<Recette> findAll() {
		List<Recette> list = new ArrayList<Recette>();
		recetteRepository.findAll().forEach(recette -> list.add(recette));
		return list;
	}	
	
	public Recette findRecette(int id) {
		return recetteRepository.findById(id).get();
	}
	
	public void deleteRecette(int id) {
		recetteRepository.deleteById(id);
	}
	
	public void saveOrUpdateRecette(Recette recette) {
		recetteRepository.save(recette);
	}
}
