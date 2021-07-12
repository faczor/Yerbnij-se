package com.yerbnijse.scraper.scrapingTool.strategy;

import com.yerbnijse.scraper.scrapingTool.Strategy;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UnMateStrategy implements Strategy {

  private final List<String> links = setLinks();

  @Override
  public String getDomainName() {
    return "UnMate";
  }

  @Override
  public List<String> getProductListLink() {
    return links;
  }

  @Override
  public Elements extractProducts(Document document) {
    return document.select("article.product-single--un");
  }

  @Override
  public String extractProductName(Element element) {
    return element.select("h2.product-single--un-title").select("a.product-single--un-product").text();
  }

  @Override
  public String extractPrice(Element element) {
    return element.select("span.product-single--un-price-actual").text();
  }

  @Override
  public String extractImage(Element element, String url) {
    return element.select("div.product-single--un-image-handler").select("img[src^=https://un-mate.pl]").attr("src");
  }

  @Override
  public String extractLink(Element element) {
    return "https://www.un-mate.pl" + element.select("a.product-single--un-product").attr("href");
  }

  @Override
  public String getMockFileName() {
    return "UnMate.html";
  }

  private List<String> setLinks() {
    List<String> links = new ArrayList<>();
    String path = "https://un-mate.pl/yerba-mate/page/";
    for (int i = 1; i <= 11; i++)
      links.add(path + "" + i);
    return links;
  }
}
