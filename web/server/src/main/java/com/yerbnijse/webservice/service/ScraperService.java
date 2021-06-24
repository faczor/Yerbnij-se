package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.model.Portal;
import com.yerbnijse.webservice.model.dto.Pagination;
import com.yerbnijse.webservice.model.dto.PagingResult;
import com.yerbnijse.webservice.model.dto.output.PortalListDto;
import com.yerbnijse.webservice.repository.PortalRepository;
import com.yerbnijse.webservice.util.enums.PortalEnum;
import java.time.LocalDateTime;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
@EnableAsync
@Slf4j
@RequiredArgsConstructor
public class ScraperService {

	@Value("${app.scrapper.host}")
	private String scrapperHost;

	private final PortalRepository portalRepository;

	@Async
	@Scheduled(cron = "0 0 1,12 * * ?")
	public void scraperRequest() {
		Arrays.stream(PortalEnum.values()).forEach(this::requestData);
	}

	public void requestData(PortalEnum portalEnum) {
		Portal portal = portalRepository.findByCode(portalEnum.name());
		CloseableHttpClient client = HttpClients.createDefault();
		HttpGet request = new HttpGet(scrapperHost + "/scrap/" + portalEnum.name());
		try (CloseableHttpResponse response = client.execute(request)) {
			log.info("Odpowiedz serwisu scrapującego: " + response.getStatusLine().toString());
			portal.setScrapDate(LocalDateTime.now());
			portal.setLastResponse(response.getStatusLine().getStatusCode());
			portalRepository.save(portal);
		} catch (Exception e) {
			log.error("Coś poszło nie tak przy requeście wymuszającym pobieranie danych. Wyjątek: " + e.getCause());
			portal.setScrapDate(LocalDateTime.now());
			portal.setLastResponse(500);
		} finally {
			portalRepository.save(portal);
		}
	}

	public PagingResult getPages(Pagination pagination) {
		return PagingResult.from(portalRepository.findAll(pagination.resolve()), PortalListDto.class, Portal.class);
	}
}
