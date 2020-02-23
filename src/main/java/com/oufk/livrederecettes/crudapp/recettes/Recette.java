package com.oufk.livrederecettes.crudapp.recettes;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Recette {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false)
	private int id;
	private String nomRecette;
	private int note;
	private String contenu;
	
	public Recette () {}
	public Recette (int i, String n) {
		if (n == null) throw new NullPointerException();
		if (n.isEmpty()) throw new IllegalArgumentException();
		this.nomRecette = n;
		this.id = i;
	}
	
	/**
	 * Setter pour une note
	 * 
	 * @param i
	 * 					note (comprise entre 1 et 5)
	 * @throws IllegalArgumentException
	 * 					si la note n'est pas comprise entre 1 et 5
	 */
	public void setNote(int i) {
		if (i > 5 || i < 0) throw new IllegalArgumentException("La note doit être comprise entre 0 et 5.");
		this.note = i;
	}
	/**
	 * Setter pour le contenu: la description de la recette.
	 * @param s
	 * 					String contenant la despription de la recette.
	 */
	public void setContenu(String s) {
		this.contenu = s;
	}
	/**
	 * Setter pour le nom de la recette.
	 * @param s
	 * 					String contenant le nom de la recette.
	 */
	public void setNom(String n) {
		this.nomRecette = n;
	}
	/**
	 * @return Renvoie le nom de la recette
	 */
	public String getNomRecette() {return this.nomRecette;}
	/**
	 * @return Renvoie la note de la recette
	 */
	public int getNote() {return this.note;}
	/**
	 * Renvoie la description de la recette.
	 */
	public String getContenu() {return this.contenu;}
	/**
	 * Renvoie le numéro de la recette.
	 */
	public int getId() {return this.id;}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		result = prime * result + ((nomRecette == null) ? 0 : nomRecette.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Recette other = (Recette) obj;
		if (id != other.id)
			return false;
		if (nomRecette == null) {
			if (other.nomRecette != null)
				return false;
		} else if (!nomRecette.equals(other.nomRecette))
			return false;
		return true;
	}
}