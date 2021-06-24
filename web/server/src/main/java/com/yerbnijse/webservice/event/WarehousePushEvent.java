package com.yerbnijse.webservice.event;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEvent;

@Slf4j
@Getter
public class WarehousePushEvent extends ApplicationEvent {
	private final String param;

	public WarehousePushEvent(Object source, String param) {
		super(source);
		this.param = param;
	}
}
