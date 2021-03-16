package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import com.yerbnijse.scraper.scrapingTool.strategy.DobreZieleStrategy;
import com.yerbnijse.scraper.scrapingTool.strategy.PoyerbaniStrategy;
import com.yerbnijse.scraper.scrapingTool.strategy.UnMateStrategy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class StrategyFactory {

  private final DobreZieleStrategy dobreZiele;
  private final UnMateStrategy unMate;
  private final PoyerbaniStrategy poyerbani;

  public Strategy of(Domain domain) {
    return switch (domain) {
      case DOBRE_ZIELE -> dobreZiele;
      case UN_MATE -> unMate;
      case POYERBANI -> poyerbani;
    };
  }
}
