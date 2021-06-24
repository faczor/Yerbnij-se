package com.yerbnijse.webservice.util.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum PortalEnum {
	DOBRE_ZIELE(1), UN_MATE(2), POYERBANI(3);

	@Getter
	private final Integer id;

	public static PortalEnum resolveBy(String portalName) {
		return switch (portalName) {
			case "DobreZiele" -> DOBRE_ZIELE;
			case "UnMate" -> UN_MATE;
			case "Poyerbani" -> POYERBANI;
			default -> null;
		};
	}
}
