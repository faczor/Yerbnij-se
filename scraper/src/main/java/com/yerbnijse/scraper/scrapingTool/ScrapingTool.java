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

    @Value("#{new Boolean('${app.testing}')}")
    private boolean isTest;

    private final  StrategyFactory strategyFactory;

    @EventListener
    public void processPage(ScrapingEvent event) {
        Strategy strategy = strategyFactory.of(event.getDomain());
        LinkedList<ResultData> resultData = new LinkedList<>();
        Client client = new Client(isTest);
        Document domainResponse = Jsoup.parse(client.request(strategy));
        for (Element product : strategy.extractProducts(domainResponse)) {
            resultData.add(
                    new ResultData.Builder()
                            .domainName(strategy.getDomainName())
                            .productName(strategy.extractProductName(product))
                            .productPrice(strategy.extractPrice(product))
                            .productAmount(strategy.extractAmount(product))
                            .productImage(strategy.extractImage(product))
                            .build());
        }
        System.out.println(resultData);
    }
}
