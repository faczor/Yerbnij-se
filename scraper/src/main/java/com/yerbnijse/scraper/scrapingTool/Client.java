package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.utils.FileUtils;
import okhttp3.OkHttpClient;
import okhttp3.Protocol;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

public class Client {
  private boolean isTest;

  private final OkHttpClient client;

  public Client(boolean isTest) {
    this.client = createClient();
    this.isTest = isTest;
  }

  public String request(Strategy strategy) {
    if (isTest)
      return FileUtils.getMock(strategy);
    Request request = new Request.Builder().url(strategy.getProductListLink()).get().build();
    try (Response response = client.newCall(request).execute()) {
      return response.body() != null ? response.body().string() : "";
    } catch (IOException e) {
      return "";
    }
  }

  private OkHttpClient createClient() {
    return new OkHttpClient().newBuilder()
            .connectTimeout(2, TimeUnit.MINUTES)
            .readTimeout(2, TimeUnit.MINUTES)
            .protocols(Collections.singletonList(Protocol.HTTP_1_1))
            .followRedirects(true)
            .build();
  }
}
