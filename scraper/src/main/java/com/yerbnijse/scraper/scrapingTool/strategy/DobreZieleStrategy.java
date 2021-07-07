package com.yerbnijse.scraper.scrapingTool.strategy;

import com.yerbnijse.scraper.scrapingTool.Strategy;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class DobreZieleStrategy implements Strategy {
  @Override
  public String getDomainName() {
    return "DobreZiele";
  }

  @Override
  public List<String> getProductListLink() {
    return List.of("https://dobreziele.pl/sklep/yerba-mate");
  }

  @Override
  public Elements extractProducts(Document document) {
    return document.select("div.shop-item");
  }

  @Override
  public String extractProductName(Element product) {
    return product.select("a[href^=https://dobreziele.pl]").first().attr("title");
  }

  @Override
  public String extractPrice(Element product) {
    return product.select("a[href^=https://dobreziele.pl]").last().select("span.price").text();
  }

  @Override
  public String extractImage(Element product) {
    return StringUtils.substringBetween(
        product.select("a[href^=https://dobreziele.pl]").first().attr("style"),
        "background-image:url(",
        ")");
  }

  @Override
  public String extractLink(Element element) {
    return element.select("a").attr("href");
  }

  @Override
  public String getMockFileName() {
    return "DobreZiele.html";
  }
}
