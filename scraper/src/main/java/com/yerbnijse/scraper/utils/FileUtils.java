package com.yerbnijse.scraper.utils;

import com.yerbnijse.scraper.scrapingTool.Strategy;
import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class FileUtils {

  @SneakyThrows
  public static String getMock(Strategy strategy) {
    InputStream resource = new ClassPathResource("mocks/" + strategy.getMockFileName()).getInputStream();
    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(resource))) {
      return reader.lines().collect(Collectors.joining("\n"));
    }
  }
}
