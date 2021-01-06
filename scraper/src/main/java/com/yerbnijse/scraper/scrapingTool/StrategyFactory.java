package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import com.yerbnijse.scraper.model.ScraperException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class StrategyFactory {

  private final DobreZieleStrategy dobreZiele;

  public Strategy of(Domain domain) {
    switch (domain) {
      case DOBRE_ZIELE: return dobreZiele;
      default: throw new ScraperException("Domain not found");
    }
  }
}
