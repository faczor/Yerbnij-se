package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Filter;
import lombok.Getter;

@Getter
public class SimpleFilterDto {
	private Long id;
	private String name;

	public static SimpleFilterDto from(Filter filter) {
		SimpleFilterDto dto = new SimpleFilterDto();
		dto.id = filter.getId();
		dto.name = filter.getName();
		return dto;
	}
}
