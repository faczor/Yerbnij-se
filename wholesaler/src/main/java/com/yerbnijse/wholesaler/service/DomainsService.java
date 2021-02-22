package com.yerbnijse.wholesaler.service;

import com.yerbnijse.wholesaler.configuration.ScrapingEvent;
import com.yerbnijse.wholesaler.dto.DomainData;
import com.yerbnijse.wholesaler.model.*;
import com.yerbnijse.wholesaler.repository.DobreZieleRepository;
import com.yerbnijse.wholesaler.repository.PoyerbaniRepository;
import com.yerbnijse.wholesaler.repository.UnMateRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

@Service
@AllArgsConstructor
public class DomainsService {

  private final DobreZieleRepository dzRepository;
  private final UnMateRepository unMateRepository;
  private final PoyerbaniRepository poyerbaniRepository;

  @EventListener
  public void processData(ScrapingEvent event) {
    Map<String, List<DomainData>> domainsData = event.getData().stream().collect(groupingBy(DomainData::getProductName));
    Iterator<String> keySet = domainsData.keySet().iterator();
    Map<String, List<DomainObject>> loadedData = getLoadedDataForDomain(event.getDomain()).stream().collect(groupingBy(DomainObject::getProductName));
    List<DomainObject> dataToLoad = new ArrayList<>();

    while (keySet.hasNext()) {
      String key = keySet.next();
      if (loadedData.get(key) == null) {
        dataToLoad.addAll(domainsData.get(key).stream().map(DomainObject::fromData).collect(Collectors.toList()));
      } else {
        Map<Integer, List<DomainData>> domainDataGroupedByAmount = domainsData.get(key).stream().collect(groupingBy(DomainData::getProductAmount));
        Map<Integer, List<DomainObject>> loadedGroupedByAmount = loadedData.get(key).stream().collect(groupingBy(DomainObject::getProductAmount));
        for (Integer keyByAmount : domainDataGroupedByAmount.keySet()) {
          if (loadedGroupedByAmount.get(keyByAmount) == null) {
            dataToLoad.addAll(domainsData.get(key).stream().map(DomainObject::fromData).collect(Collectors.toList()));
          } else {
            if (!domainDataGroupedByAmount.get(keyByAmount).get(0).getProductPrice().equals(loadedGroupedByAmount.get(keyByAmount).get(0).getProductPrice())) {
              dataToLoad.add(DomainObject.fromData(domainDataGroupedByAmount.get(keyByAmount).get(0)));
              DomainObject domainObjectToHide = loadedGroupedByAmount.get(keyByAmount).get(0);
              domainObjectToHide.setIsVisible(false);
              dataToLoad.add(domainObjectToHide);
            }
          }
        }
      }
    }

    System.out.println(saveData(dataToLoad, event.getDomain()));
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
