package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.input.FilterInput;
import com.yerbnijse.webservice.service.FilterService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/offer/filter")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FilterController {

	public final FilterService filterService;

	@GetMapping
	public ResponseEntity<?> getUserFilters() {
		return ResponseEntity.ok(filterService.getFilters());
	}

	@PostMapping
	public ResponseEntity<?> addFilter(@RequestBody FilterInput filterInput) {
		return ResponseEntity.ok(filterService.addFilter(filterInput));
	}

	@GetMapping("/list")
	public ResponseEntity<?> getList() {
		return ResponseEntity.ok(filterService.getFilterList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getFilterDetails(@PathVariable(name = "id") Long filterId) {
		return ResponseEntity.ok(filterService.getDetails(filterId));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteFilter(@PathVariable(name = "id") Long filterId) {
		filterService.delete(filterId);
		return ResponseEntity.ok().build();
	}
}
