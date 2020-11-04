package com.yerbnijse.scraper;

import com.yerbnijse.scraper.scrapingTool.ClientFactory;
import okhttp3.OkHttpClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ScraperApplication {

	@Bean
	public OkHttpClient client(ClientFactory clientFactory) {
		return clientFactory.createClient();
	}

	public static void main(String[] args) {
		SpringApplication.run(ScraperApplication.class, args);
	}

}
