package com.yerbnijse.scraper.model;

import com.yerbnijse.scraper.scrapingTool.Strategy;
import com.yerbnijse.scraper.scrapingTool.Transformer;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.jsoup.nodes.Element;

@ToString
@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
public class ResultData {
  private String domainName;
  private String productName;
  private Integer productAmount;
  private Double productPrice;
  private String productImage;
  private String productLink;

  public static ResultData of(Strategy strategy, Transformer transformer, Element element) {
    ResultData data = new ResultData();
    data.domainName = strategy.getDomainName();
    Pair<String, Integer> nameAmount = transformer.extractFromTitle(strategy.extractProductName(element));
    data.productName = nameAmount.getLeft();
    data.productAmount = nameAmount.getRight();
    data.productPrice = transformer.extractPrice(strategy.extractPrice(element));
    data.productImage = strategy.extractImage(element);
    data.productLink = strategy.extractLink(element);
    return data;
  }

  public boolean isUnknown() {
    boolean isUnknown = this.productName == null || this.productAmount == null || this.productPrice == null;
    if (isUnknown) {
      log.info("Delete from list: " + this);
      return true;
    }
    return false;
  }
}
