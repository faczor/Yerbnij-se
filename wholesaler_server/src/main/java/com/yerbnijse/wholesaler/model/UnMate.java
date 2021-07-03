package com.yerbnijse.wholesaler.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "UnMate")
public class UnMate extends DomainObject {
  @Id
  private String id;

  public static List<UnMate> dynamicCast(List<DomainObject> domainObjects) {
    List<UnMate> result = new ArrayList<>();
    for (DomainObject domainObj : domainObjects) {
      if (domainObj instanceof UnMate) {
        result.add((UnMate) domainObj);
      } else {
        UnMate unMate = new UnMate();
        unMate.setFields(domainObj);
        result.add(unMate);
      }
    }
    return result;
  }
}
