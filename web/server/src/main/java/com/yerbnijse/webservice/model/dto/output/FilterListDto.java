package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Filter;
import lombok.Getter;

@Getter
public class FilterListDto {

  private Long id;
  private String name;

  public static FilterListDto from(Filter filter) {
    FilterListDto dto = new FilterListDto();
    dto.id = filter.getId();
    dto.name = filter.getName();
    return dto;
  }
}
