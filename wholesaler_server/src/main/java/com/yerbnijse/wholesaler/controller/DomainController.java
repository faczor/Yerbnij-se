package com.yerbnijse.wholesaler.controller;

import com.yerbnijse.wholesaler.model.ScrapingEvent;
import com.yerbnijse.wholesaler.model.UserActionEvent;
import com.yerbnijse.wholesaler.model.DomainData;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:8080"})
public class DomainController {

  private final ApplicationEventPublisher eventPublisher;

  @GetMapping("/")
  public ResponseEntity<?> getIt() {
    return ResponseEntity.ok().build();
  }

  @PostMapping("/domain")
  public ResponseEntity<?> getData(@RequestBody List<DomainData> data) {
    if (data.isEmpty()) {
      log.error("Błąd przy odbieraniu ofert, lista jest pusta.");
      return ResponseEntity.ok().build();
    }
    eventPublisher.publishEvent(new ScrapingEvent(this, data));
    return ResponseEntity.ok().build();
  }

  @PostMapping("/user/action")
  public ResponseEntity<?> action(@RequestBody String param) {
    eventPublisher.publishEvent(new UserActionEvent(this, param));
    return ResponseEntity.ok().build();
  }
}
