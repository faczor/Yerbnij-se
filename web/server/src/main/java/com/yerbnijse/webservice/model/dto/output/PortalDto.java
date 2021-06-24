package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Portal;
import lombok.Getter;

@Getter
public class PortalDto {
  private Integer id;
  private String name;
  private String logo;
  private String link;

  public static PortalDto from(Portal portal) {
    PortalDto dto = new PortalDto();
    dto.id = portal.getId();
    dto.link = portal.getLink();
    dto.name = portal.getName();
    dto.logo = portal.getLogo();
    return dto;
  }
}
