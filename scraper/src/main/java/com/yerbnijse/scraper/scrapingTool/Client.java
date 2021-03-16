package com.yerbnijse.scraper.scrapingTool;

import com.google.gson.Gson;
import com.yerbnijse.scraper.model.ResultData;
import com.yerbnijse.scraper.utils.FileUtils;
import okhttp3.*;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Client {

  private final String isTest;
  private final OkHttpClient client;

  public Client(String isTest) {
    this.client = createClient();
    this.isTest = isTest;
  }

  public String request(Strategy strategy, int iteration) {
    if (isTest.equals("TEST"))
      return FileUtils.getMock(strategy);
    Request request = new Request.Builder().url(strategy.getProductListLink().get(iteration)).get().build();
    try (Response response = client.newCall(request).execute()) {
      return response.body() != null ? response.body().string() : "";
    } catch (IOException e) {
      return "";
    }
  }

  public boolean pushData(List<ResultData> data) {
    try {
      CloseableHttpClient client = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost("http://localhost:8082/domain");
      String json = new Gson().toJson(data);
      StringEntity entity = new StringEntity(json, "UTF-8");
      httpPost.setEntity(entity);
      httpPost.setHeader("Accept", "application/json");
      httpPost.setHeader("Content-type", "application/json");
      CloseableHttpResponse response = client.execute(httpPost);
      System.out.println(data);
      client.close();
    } catch (Exception e) {
      return false;
    }
    return true;
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
