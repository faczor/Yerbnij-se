package com.yerbnijse.webservice.event;

import com.yerbnijse.webservice.model.Offer;
import java.util.List;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OffersNotificationEvent extends ApplicationEvent {
	private final List<Offer> offers;

	public OffersNotificationEvent(Object source, List<Offer> offers) {
		super(source);
		this.offers = offers;
	}
}
