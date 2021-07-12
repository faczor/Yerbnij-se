package com.yerbnijse.scraper.scrapingTool;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.List;

public interface Strategy {
  String getDomainName();

  List<String> getProductListLink();

  Elements extractProducts(Document document);

  String extractProductName(Element product);

  String extractPrice(Element element);

  String extractImage(Element element, String url);

  String extractLink(Element element);

  String getMockFileName();
}
