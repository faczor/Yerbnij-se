package com.yerbnijse.webservice.model.dto;

import static com.yerbnijse.webservice.util.ApiDefaults.PAGE;
import static com.yerbnijse.webservice.util.ApiDefaults.SIZE;
import static com.yerbnijse.webservice.util.ApiDefaults.SORT_DIRECTION;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class Pagination {
	private Integer page = PAGE;
	private Integer size = SIZE;
	private String sortBy;
	private Sort.Direction sortDirection = SORT_DIRECTION;

	public PageRequest resolve() {
		if (sortBy == null || sortBy.isBlank()) {
			return PageRequest.of(page - 1, size);
		}
		return PageRequest.of(page - 1, size, Sort.by(sortDirection, sortBy));
	}
}
