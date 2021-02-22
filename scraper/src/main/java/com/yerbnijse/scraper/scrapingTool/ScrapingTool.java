package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.ResultData;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.LinkedList;

@Component
@RequiredArgsConstructor
public class ScrapingTool {

  /*@Value("#{new Boolean('${app.testing}')}")
  private boolean isTest;*/

  private final StrategyFactory strategyFactory;

  @EventListener
  public void processPage(ScrapingEvent event) {
    Strategy strategy = strategyFactory.of(event.getDomain());
    LinkedList<ResultData> resultData = new LinkedList<>();
    Client client = new Client(true);
    Transformer transformer = TransformerFactory.of(event.getDomain());
    for (int i = 0; i < strategy.getProductListLink().size(); i++) {
      Document domainResponse = Jsoup.parse(client.request(strategy, i));
      for (Element product : strategy.extractProducts(domainResponse)) {
        resultData.add(ResultData.of(strategy, transformer, product));
      }
    }
    cleanFromUnknownItems(resultData);
    boolean result = client.pushData(resultData);
    System.out.println(result);
  }

  private void cleanFromUnknownItems(LinkedList<ResultData> resultData) {
    resultData.removeIf(ResultData::isUnknown);
  }
}
