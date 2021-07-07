package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.event.OnSentEmailEvent;
import com.yerbnijse.webservice.model.dto.input.ContactDto;
import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.annotation.PostConstruct;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

  private static final String NAME = "Yerbnij se";
  private static JavaMailSenderImpl MAILER;
  private static InternetAddress from;
  @Value("${mail.username}")
  private String emailAddress;
  @Value("${mail.host}")
  private String host;
  @Value("${mail.port}")
  private int port;
  @Value("${mail.password}")
  private String password;
  @Value("${mail.smtp.auth}")
  private String smtpAuth;
  @Value("${mail.smtp.starttls.enable}")
  private String smtpStarttlsEnable;

  @PostConstruct
  private void buildMailer() throws UnsupportedEncodingException {
    MAILER = new JavaMailSenderImpl();
    MAILER.setHost(host);
    MAILER.setPort(port);
    MAILER.setUsername(emailAddress);
    MAILER.setPassword(password);
    Properties props = MAILER.getJavaMailProperties();
    props.put("mail.smtp.auth", smtpAuth);
    props.put("mail.smtp.starttls.enable", smtpStarttlsEnable);
    from = new InternetAddress(emailAddress, NAME);
  }

  @EventListener
  public void activationEmailEvent(OnSentEmailEvent emailEvent) {
    sendEmail(emailEvent);
  }

  private void sendEmail(OnSentEmailEvent event) {
    try {
      String to = event.getUser();
      MimeMessage message = MAILER.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, false);
      helper.setFrom(from);
      helper.setTo(to);
      helper.setSubject(event.getSubject());
      helper.setText(event.getContent());
      MAILER.send(message);
      log.info(String.format("Wysłano email na email %s o treści: %s", to, event.getContent()));
    } catch (Exception e) {
      log.error("Wystąpił problem przy wysłaniu emaila. Wyjątek" + e.getMessage());
      e.printStackTrace();
    }
  }

  public void contact(ContactDto dto, String email) {
    try {
      MimeMessage message = MAILER.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, false);
      helper.setFrom(from);
      helper.setTo(email);
      helper.setSubject("Wiadomość wysłana z formularza kontaktowego");
      helper.setText(
          String.format(
              "Tytuł: %s\n\nNadawca: %s\n\nTreść: %s",
              dto.getTitle(), email, dto.getContent()));
      MAILER.send(message);
      log.info("Wysłano email z formularza kontaktowego");
    } catch (Exception e) {
      log.error("Wystąpił problem przy wysłaniu emaila. Wyjątek" + e.getMessage());
      e.printStackTrace();
    }
  }
}
