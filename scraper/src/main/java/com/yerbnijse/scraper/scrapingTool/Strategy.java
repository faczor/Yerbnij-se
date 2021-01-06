package com.yerbnijse.scraper.scrapingTool;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public interface Strategy {
  String getDomainName();
  String getProductListLink();
  Elements extractProducts(Document document);
  String extractProductName(Element product);
  String extractPrice(Element element);
  String extractImage(Element element);
  String extractAmount(Element element);
  String getMockFileName();
}
