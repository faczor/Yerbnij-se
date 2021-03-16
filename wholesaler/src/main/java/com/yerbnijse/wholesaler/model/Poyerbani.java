package com.yerbnijse.wholesaler.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "Poyerbani")
public class Poyerbani extends DomainObject {
  @Id public String id;

  public static List<Poyerbani> dynamicCast(List<DomainObject> domainObjects) {
    List<Poyerbani> result = new ArrayList<>();
    for (DomainObject domainObj: domainObjects) {
      if (domainObj instanceof Poyerbani) {
        result.add((Poyerbani) domainObj);
      } else {
        Poyerbani poyerbani = new Poyerbani();
        poyerbani.setFields(domainObj);
        result.add(poyerbani);
      }
    }
    return result;
  }
}
