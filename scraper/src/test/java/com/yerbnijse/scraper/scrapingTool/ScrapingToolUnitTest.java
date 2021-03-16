package com.yerbnijse.scraper.scrapingTool;

import com.yerbnijse.scraper.model.Domain;
import okhttp3.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class ScrapingToolUnitTest {

    @Test
    public void dobreZieleShouldReturnValidData() throws IOException {
        /*OkHttpClient okHttpClient = mock(OkHttpClient.class);
        Call call = mock(Call.class);
        when(okHttpClient.newCall(any())).thenReturn(call);
        when(call.execute()).thenReturn(prepDummyResponse(Domain.DOBRE_ZIELE));
        ScrapingTool scrapingTool = new ScrapingTool(okHttpClient);
        scrapingTool.processPage(Domain.DOBRE_ZIELE);
    }

    private Response prepDummyResponse(Domain domain) throws IOException {
        File resource = new ClassPathResource(
                domain.getDomainName() + ".html").getFile();
        Request request = new Request.Builder()
                .url("https://www.dummy.com")
                .build();
        return new Response.Builder()
                .request(request)
                .protocol(Protocol.HTTP_2)
                .code(200)
                .message("")
                .body(ResponseBody.create(
                        MediaType.parse("text/plain"),
                        new String(Files.readAllBytes(resource.toPath()))
                )).build();*/
    }
}
