package com.yerbnijse.webservice.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static java.lang.String.format;

@Configuration
public class SwaggerConfiguration {

	@Value("${spring.application.name}")
	private String applicationName;

	@Bean
	public OpenAPI springApi() {
		return new OpenAPI().info(new Info().title(format("%s API documentation", applicationName))
				.description("Simple documentation description")
				.license(new License().name("Apache 2.0").url("http://springdoc.org")));
	}
}
