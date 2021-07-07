package com.yerbnijse.wholesaler.model;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEvent;

import java.util.List;

@Slf4j
@Getter
public class ScrapingEvent extends ApplicationEvent {
  private final List<DomainData> data;
  private final Domain domain;

  public ScrapingEvent(Object source, List<DomainData> data) {
    super(source);
    this.data = data;
    this.domain = resolveDomain(data.get(0).getDomainName());
    log.info("New incoming scraping event.");
  }

  private Domain resolveDomain(String domainName) {
    return switch (domainName) {
      case "DobreZiele" -> Domain.DOBRE_ZIELE;
      case "UnMate" -> Domain.UN_MATE;
      case "Poyerbani" -> Domain.POYERBANI;
      default -> throw new IllegalStateException("Unexpected value: " + domainName);
    };
  }
}
