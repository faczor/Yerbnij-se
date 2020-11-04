package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import com.yerbnijse.scraper.model.ResultData;
import com.yerbnijse.scraper.utils.ObjectMapper;
import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@Component
public class ScrapingTool {

    private final OkHttpClient client;

    public ScrapingTool(OkHttpClient client) {
        this.client = client;
    }

    public List<ResultData> processPage(Domain domain) {
        LinkedList<ResultData> resultData = new LinkedList<>();
        Document domainResponse = Jsoup.parse(call(domain.getProductListLink()));
        for (Element product : domain.extractProducts(domainResponse)) {
            resultData.add(
                    new ResultData.Builder()
                            .domainName(domain.getDomainName())
                            .productName(domain.extractProductName(product))
                            .productPrice(domain.extractPrice(product))
                            .productAmount(domain.extractAmount(product))
                            .productImage(domain.extractImage(product))
                            .build());
        }
        System.out.println(resultData);
        return resultData;
    }

    //TODO HANDLE IOEXCEPTION IN RIGHT WAY
    private String call(String link) {
        Request request = new Request.Builder()
                .url(link)
                .build();
        Call call = client.newCall(request);
        try {
            Response response = call.execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }
}
