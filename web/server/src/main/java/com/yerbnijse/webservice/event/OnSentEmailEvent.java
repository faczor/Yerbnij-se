package com.yerbnijse.webservice.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OnSentEmailEvent extends ApplicationEvent {

	private final String user;
	private final String subject;
	private final String content;

	public OnSentEmailEvent(String user, String subject, String content) {
		super(user);
		this.user = user;
		this.subject = subject;
		this.content = content;
	}
}
