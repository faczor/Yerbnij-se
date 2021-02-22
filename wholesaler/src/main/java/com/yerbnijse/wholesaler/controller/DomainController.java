package com.yerbnijse.wholesaler.controller;

import com.yerbnijse.wholesaler.configuration.ScrapingEvent;
import com.yerbnijse.wholesaler.dto.DomainData;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class DomainController {

  private final ApplicationEventPublisher eventPublisher;

  @GetMapping("/")
  public ResponseEntity<?> getIt() {
    System.out.println("GET IT PPLSS");
    return ResponseEntity.ok().build();
  }

  @PostMapping("/domain")
  public ResponseEntity<?> getData(@RequestBody List<DomainData> data) {
    eventPublisher.publishEvent(new ScrapingEvent(this, data));
    return ResponseEntity.ok().build();
  }
}
