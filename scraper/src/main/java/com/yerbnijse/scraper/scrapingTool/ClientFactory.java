package com.yerbnijse.scraper.scrapingTool;

import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Component
public class ClientFactory {

    public OkHttpClient createClient() {
        return new OkHttpClient().newBuilder()
                .connectTimeout(2, TimeUnit.MINUTES)
                .readTimeout(2, TimeUnit.MINUTES)
                .protocols(Collections.singletonList(Protocol.HTTP_1_1))
                .followRedirects(true)
                .build();
    }
}
