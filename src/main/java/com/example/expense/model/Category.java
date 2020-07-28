package com.example.expense.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@Data
@Table(name="category")

public class Category {

	@Id
	@GeneratedValue

	private Long id;
	@NonNull
	private String name;

	
}
