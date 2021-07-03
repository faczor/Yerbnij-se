package com.yerbnijse.scraper.scrapingTool;

import com.google.gson.Gson;
import com.yerbnijse.scraper.model.ResultData;
import com.yerbnijse.scraper.utils.FileUtils;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
public class Client {

  private final String isTest;
  private final OkHttpClient client;
  private final String warehouseUrl;

  public Client(String isTest, String warehouseUrl) {
    this.isTest = isTest;
    this.client = createClient();
    this.warehouseUrl = warehouseUrl;
  }

  public String request(Strategy strategy, int iteration) {
    if (isTest.equals("TEST"))
      return FileUtils.getMock(strategy);
    Request request = new Request.Builder().url(strategy.getProductListLink().get(iteration)).get().build();
    try (Response response = client.newCall(request).execute()) {
      return response.body() != null ? response.body().string() : "";
    } catch (IOException e) {
      log.error("Coś poszło nie tak przy scrapowaniu strony. Exception: " + e);
      return "";
    }
  }

  public boolean pushData(List<ResultData> data) {
    System.out.println("NEWWW");
    RequestBody body = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), new Gson().toJson(data));
    Request request = new Request.Builder().url(warehouseUrl + "/domain").post(body).build();
    try (Response response = client.newCall(request).execute()){
      return response.body() != null;
    } catch (IOException e) {
      log.error("Coś poszło nie tak przy przekazywaniu danych do hurtowni. Exception: " + e);
      e.printStackTrace();
      return false;
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
