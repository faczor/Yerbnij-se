package com.yerbnijse.scraper.controller;

import com.yerbnijse.scraper.model.Domain;
import com.yerbnijse.scraper.scrapingTool.ScrapingEvent;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class Controller {

  private final ApplicationEventPublisher eventPublisher;

  @GetMapping("/scrap/{domain}")
  public ResponseEntity<?> requestScraping(@PathVariable String domain) {
    try {
      Domain requestedDomain = Domain.valueOf(domain);
      eventPublisher.publishEvent(new ScrapingEvent(this, requestedDomain));
      return ResponseEntity.ok().build();
    } catch (IllegalArgumentException exception) {
      return ResponseEntity.badRequest().body("Provided domain is not supported");
    }
  }
}
