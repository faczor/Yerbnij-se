package com.yerbnijse.scraper.scrapingTool.strategy;

import com.yerbnijse.scraper.scrapingTool.Strategy;
import lombok.SneakyThrows;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PoyerbaniStrategy implements Strategy {

  private final List<String> links = setLinks();

  @Override
  public String getDomainName() {
    return "Poyerbani";
  }

  @Override
  public List<String> getProductListLink() {
    return links;
  }

  @Override
  public Elements extractProducts(Document document) {
    return document.select("div.product.col-6.col-sm-4.col-md-3.pt-3.pb-md-3.mb-3.mb-sm-0");
  }

  @Override
  public String extractProductName(Element element) {
    return element.select("a.product__name").attr("title");
  }

  @Override
  public String extractPrice(Element element) {
    return element.select("strong.price").text();
  }

  @Override
  @SneakyThrows
  public String extractImage(Element element, String url) {
    Document document = Jsoup.connect(url).get();
    return "https://www.poyerbani.pl" + document.select("a.photos__link").select("img").attr("data-lazy");
  }

  @Override
  public String extractLink(Element element) {
    return "https://www.poyerbani.pl" + element.select("a.product__name").attr("href");
  }

  @Override
  public String getMockFileName() {
    return "Poyerbani.html";
  }

  private List<String> setLinks() {
    ArrayList<String> list = new ArrayList<>();
    String path = "https://www.poyerbani.pl/pol_m_Yerba-Mate_Yerba-Mate-wedlug-kraju-520.html";
    list.add(path);
    for (int i = 1; i < 17; i++) {
      list.add(path + "?counter=" + i);
    }
    return list;
  }
}
