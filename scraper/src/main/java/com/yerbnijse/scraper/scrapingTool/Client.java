package com.yerbnijse.scraper.scrapingTool;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yerbnijse.scraper.model.ResultData;
import com.yerbnijse.scraper.utils.FileUtils;
import lombok.SneakyThrows;
import okhttp3.*;

import java.io.IOException;
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

  //@SneakyThrows({JsonProcessingException.class, IOException.class})
  public boolean pushData(List<ResultData> data) {
    /*Request request = new Request.Builder()
            .url("https://localhost:8080/dummy")
            .put(RequestBody.create(MediaType.parse("application/json"), OBJECT_MAPPER.writeValueAsString(data)))
            .build();
    try(Response response = client.newCall(request).execute()) {
      return response.isSuccessful();
    }*/
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
