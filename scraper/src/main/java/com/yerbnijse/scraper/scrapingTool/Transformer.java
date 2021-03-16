package com.yerbnijse.scraper.scrapingTool;

import org.apache.commons.lang3.tuple.Pair;

public interface Transformer {
  Pair<String, Integer> extractFromTitle(String title);

  default Double extractPrice(String price) {
    return Double.parseDouble(price.split(" zł")[0].replace(",", "."));
  }
}
