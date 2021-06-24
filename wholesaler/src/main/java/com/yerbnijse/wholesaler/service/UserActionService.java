package com.yerbnijse.wholesaler.service;

import com.yerbnijse.wholesaler.configuration.UserActionEvent;
import com.yerbnijse.wholesaler.model.UserAction;
import com.yerbnijse.wholesaler.repository.UserActionRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserActionService {
  private final UserActionRepository actionRepository;

  @EventListener(UserActionEvent.class)
  public void saveAction(UserActionEvent event) {
    actionRepository.save(UserAction.from(event.getParam()));
  }
}
