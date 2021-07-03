package com.yerbnijse.wholesaler.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "UserAction")
public class UserAction {
  @Id private String id;
  private String param;
  private LocalDateTime date;

  public static UserAction from(String param) {
    UserAction action = new UserAction();
    action.param = param;
    action.date = LocalDateTime.now();
    return action;
  }
}
