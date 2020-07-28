package com.example.expense.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {
	@Id
	@GeneratedValue
private Long id;
	
	private Instant expensedate;

	private String description;
	private String location;
	private Long price;


	@ManyToOne
	private Category category;



}





