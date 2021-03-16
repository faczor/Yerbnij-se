package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEvent;

@Slf4j
public class ScrapingEvent extends ApplicationEvent {
  @Getter
  private final Domain domain;

  public ScrapingEvent(Object source, Domain domain) {
    super(source);
    this.domain = domain;
    log.info("New scraping event for domain: " + domain);
  }
}
