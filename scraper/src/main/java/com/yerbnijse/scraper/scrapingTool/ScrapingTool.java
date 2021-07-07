package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.ResultData;
import java.util.LinkedList;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScrapingTool {

  private final StrategyFactory strategyFactory;
  @Value("${app.warehouse.host}")
  private String warehouseUrl;
  @Value("${app.testing}")
  private String isTest;

  @EventListener
  public void processPage(ScrapingEvent event) {
    Strategy strategy = strategyFactory.of(event.getDomain());
    LinkedList<ResultData> resultData = new LinkedList<>();
    Client client = new Client(isTest, warehouseUrl);
    Transformer transformer = TransformerFactory.of(event.getDomain());
    for (int i = 0; i < strategy.getProductListLink().size(); i++) {
      Document domainResponse = Jsoup.parse(client.request(strategy, i));
      for (Element product : strategy.extractProducts(domainResponse)) {
        resultData.add(ResultData.of(strategy, transformer, product));
      }
    }
    cleanFromUnknownItems(resultData);
    client.pushData(resultData.stream().distinct().collect(Collectors.toList()));
  }

  private void cleanFromUnknownItems(LinkedList<ResultData> resultData) {
    resultData.removeIf(ResultData::isUnknown);
  }
}
