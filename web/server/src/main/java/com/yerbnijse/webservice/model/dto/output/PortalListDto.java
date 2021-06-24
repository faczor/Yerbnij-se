package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Portal;
import com.yerbnijse.webservice.model.dto.DtoWithPaging;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class PortalListDto implements DtoWithPaging {

  private String image;
  private String portal;
  private String scrapDate;
  private String code;
  private Integer response;
  private String link;

  @Override
  public List<DtoWithPaging> toDtoResult(List<?> data) {
    List<Portal> portals = (List<Portal>) data;
    return portals.stream().map(PortalListDto::from).collect(Collectors.toList());
  }

  private static PortalListDto from(Portal portal) {
    PortalListDto dto = new PortalListDto();
    dto.image = portal.getLogo();
    dto.portal = portal.getName();
    dto.scrapDate = String.format("%s %s", portal.getScrapDate().toLocalDate(), portal.getScrapDate().toLocalTime());
    dto.code = portal.getCode();
    dto.response = portal.getLastResponse();
    dto.link = portal.getLink();
    return dto;
  }
}
