package com.yerbnijse.wholesaler.service;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toList;

import com.google.gson.Gson;
import com.yerbnijse.wholesaler.model.DobreZiele;
import com.yerbnijse.wholesaler.model.Domain;
import com.yerbnijse.wholesaler.model.DomainData;
import com.yerbnijse.wholesaler.model.DomainObject;
import com.yerbnijse.wholesaler.model.DomainOutput;
import com.yerbnijse.wholesaler.model.Poyerbani;
import com.yerbnijse.wholesaler.model.ScrapingEvent;
import com.yerbnijse.wholesaler.model.UnMate;
import com.yerbnijse.wholesaler.repository.DobreZieleRepository;
import com.yerbnijse.wholesaler.repository.PoyerbaniRepository;
import com.yerbnijse.wholesaler.repository.UnMateRepository;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DomainsService {

  private final DobreZieleRepository dzRepository;
  private final UnMateRepository unMateRepository;
  private final PoyerbaniRepository poyerbaniRepository;
  @Value("${app.web.host}")
  private String serverUrl;

  @EventListener
  public void processData(ScrapingEvent event) {
    Map<String, List<DomainData>> domainsData = event.getData()
        .stream().collect(groupingBy(DomainData::getProductName));
    Iterator<String> keySet = domainsData.keySet().iterator();
    Map<String, List<DomainObject>> loadedData = getLoadedDataForDomain(event.getDomain())
        .stream().collect(groupingBy(DomainObject::getProductName));
    List<DomainObject> dataToLoad = new ArrayList<>();

    while (keySet.hasNext()) {
      String key = keySet.next();
      if (loadedData.get(key) == null) {
        dataToLoad.addAll(domainsData.get(key).stream().map(DomainObject::fromData).collect(Collectors.toList()));
      } else {
        Map<Integer, List<DomainData>> domainDataGroupedByAmount = domainsData.get(key)
            .stream().collect(groupingBy(DomainData::getProductAmount));
        Map<Integer, List<DomainObject>> loadedGroupedByAmount = loadedData.get(key)
            .stream().collect(groupingBy(DomainObject::getProductAmount));
        for (Integer keyByAmount : domainDataGroupedByAmount.keySet()) {
          if (loadedGroupedByAmount.get(keyByAmount) == null) {
            dataToLoad.addAll(domainsData.get(key)
                .stream().map(DomainObject::fromData).collect(Collectors.toList()));
          } else {
            if (!domainDataGroupedByAmount.get(keyByAmount).get(0).getProductPrice()
                .equals(loadedGroupedByAmount.get(keyByAmount).get(0).getProductPrice())) {
              dataToLoad.add(DomainObject.fromData(domainDataGroupedByAmount.get(keyByAmount).get(0)));
              DomainObject domainObjectToHide = loadedGroupedByAmount.get(keyByAmount).get(0);
              domainObjectToHide.setIsVisible(false);
              dataToLoad.add(domainObjectToHide);
            }
          }
        }
      }
    }
    saveData(dataToLoad, event.getDomain());

    if (!dataToLoad.isEmpty()) {
      pushData(dataToLoad.stream().map(x -> DomainOutput.fromData(x, event.getDomain()))
          .collect(toList()));
    }
  }

  public boolean pushData(List<DomainOutput> data) {
    try (CloseableHttpClient client = HttpClients.createDefault()){
      HttpPost httpPost = new HttpPost(serverUrl + "/api/v1/user/offer/add");
      StringEntity entity = new StringEntity(new Gson().toJson(data), "UTF-8");
      httpPost.setEntity(entity);
      httpPost.setHeader("Accept", "application/json");
      httpPost.setHeader("Content-type", "application/json");
      client.execute(httpPost);
      log.info("Poprawnie wypchnięto nowe dane do serwera webowego");
    } catch (Exception e) {
      log.error("Błąd przy wypychaniu danych do servera webowego. Exception: " + e);
      e.printStackTrace();
      return false;
    }
    return true;
  }

  private <T extends DomainObject> List<T> getLoadedDataForDomain(Domain domain) {
    return switch (domain) {
      case DOBRE_ZIELE -> (List<T>) dzRepository.findAllByIsVisibleIsTrue();
      case UN_MATE -> (List<T>) unMateRepository.findAllByIsVisibleIsTrue();
      case POYERBANI -> (List<T>) poyerbaniRepository.findAllByIsVisibleIsTrue();
    };
  }

  private <T extends DomainObject> List<T> saveData(List<DomainObject> listToSave, Domain domain) {
    return switch (domain) {
      case DOBRE_ZIELE -> (List<T>) dzRepository.saveAll(DobreZiele.dynamicCast(listToSave));
      case UN_MATE -> (List<T>) unMateRepository.saveAll(UnMate.dynamicCast(listToSave));
      case POYERBANI -> (List<T>) poyerbaniRepository.saveAll(Poyerbani.dynamicCast(listToSave));
    };
  }
}
