package com.yerbnijse.wholesaler.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "DobreZiele")
public class DobreZiele extends DomainObject {
  @Id private String id;

  public static List<DobreZiele> dynamicCast(List<DomainObject> domainObjects) {
    List<DobreZiele> result = new ArrayList<>();
    for (DomainObject domainObj: domainObjects) {
      if (domainObj instanceof DobreZiele) {
        result.add((DobreZiele) domainObj);
      } else {
        DobreZiele dz = new DobreZiele();
        dz.setFields(domainObj);
        result.add(dz);
      }
    }
    return result;
  }
}
