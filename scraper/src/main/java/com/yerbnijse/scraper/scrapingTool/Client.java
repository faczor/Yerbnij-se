package com.yerbnijse.scraper.scrapingTool;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.yerbnijse.scraper.model.ResultData;
import com.yerbnijse.scraper.utils.FileUtils;
import lombok.SneakyThrows;
import okhttp3.*;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpHeaders;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Client {

  private final boolean isTest;
  private final OkHttpClient client;
  private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  public Client(boolean isTest) {
    this.client = createClient();
    this.isTest = isTest;
  }

  public String request(Strategy strategy, int iteration) {
    if (isTest)
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
      System.out.println(data);
      CloseableHttpClient client = HttpClients.createDefault();
      HttpPost httpPost = new HttpPost("http://localhost:8080/domain");
      String json = new Gson().toJson(data);
      StringEntity entity = new StringEntity(json, "UTF-8");
      httpPost.setEntity(entity);
      httpPost.setHeader("Accept", "application/json");
      httpPost.setHeader("Content-type", "application/json");
      CloseableHttpResponse response = client.execute(httpPost);
      System.out.println(response.getStatusLine().getStatusCode());
      client.close();
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
    return false;
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
