package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.event.OnSentEmailEvent;
import com.yerbnijse.webservice.model.dto.input.ContactDto;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.simplejavamail.email.Email;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.Mailer;
import org.simplejavamail.mailer.MailerBuilder;
import org.simplejavamail.mailer.config.TransportStrategy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

  private static final String NAME = "Yerbnij se";
  private static Mailer MAILER;
  @Value("${mail.username}")
  private String emailAddress;
  @Value("${mail.host}")
  private String host;
  @Value("${mail.port}")
  private int port;
  @Value("${mail.password}")
  private String password;

  @PostConstruct
  private void buildMailer() {
    MAILER = MailerBuilder.withSMTPServer(host, port, emailAddress, password)
        .withTransportStrategy(TransportStrategy.SMTP_TLS).buildMailer();
  }

  @EventListener
  public void activationEmailEvent(OnSentEmailEvent emailEvent) {
    sendEmail(emailEvent);
  }

  private void sendEmail(OnSentEmailEvent event) {
    Email email = EmailBuilder.startingBlank().from(NAME, emailAddress).to(event.getUser())
        .withSubject(event.getSubject()).withPlainText(event.getContent()).buildEmail();
    MAILER.sendMail(email);
  }

  public void contact(ContactDto dto) {
    Email email = EmailBuilder.startingBlank().from(NAME, emailAddress).to(emailAddress)
        .withSubject("Wiadomość wysłana z formularza kontaktowego")
        .withPlainText(String
            .format("Tytuł: %s\n\nNadawca: %s\n\nTreść: %s", dto.getTitle(), dto.getEmail(),
                dto.getContent()))
        .buildEmail();
    MAILER.sendMail(email);
  }
}
