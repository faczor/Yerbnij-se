package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import com.yerbnijse.scraper.scrapingTool.transformer.DobreZieleTransformer;
import com.yerbnijse.scraper.scrapingTool.transformer.PoyerbaniTransformer;
import com.yerbnijse.scraper.scrapingTool.transformer.UnMateTransformer;

public class TransformerFactory {

  public static Transformer of(Domain domain) {
    return switch (domain) {
      case DOBRE_ZIELE -> new DobreZieleTransformer();
      case UN_MATE -> new UnMateTransformer();
      case POYERBANI -> new PoyerbaniTransformer();
    };
  }
}
