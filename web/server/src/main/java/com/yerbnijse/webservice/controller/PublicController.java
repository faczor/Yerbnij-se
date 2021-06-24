package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.input.ContactDto;
import com.yerbnijse.webservice.service.MailService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PublicController {
  public final MailService mailService;

  @PostMapping("/contact")
  public ResponseEntity<?> contact(@RequestBody @Valid ContactDto dto) {
    //mailService.contact(dto);
    return ResponseEntity.ok().build();
  }
}
