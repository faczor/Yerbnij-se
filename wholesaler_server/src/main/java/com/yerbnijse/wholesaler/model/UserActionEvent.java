package com.yerbnijse.wholesaler.model;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserActionEvent extends ApplicationEvent {
  private final String param;

  public UserActionEvent(Object source, String param) {
    super(source);
    this.param = param;
  }
}
