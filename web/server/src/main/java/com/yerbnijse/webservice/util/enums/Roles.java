package com.yerbnijse.webservice.util.enums;

import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Roles {
	ADMIN(1L), USER(2L), NOT_VERIFIED(3L);

	@Getter
	private final Long id;

	public static Roles getById(Long id) {
		return Arrays.stream(Roles.values()).filter(roles -> roles.getId().equals(id)).findFirst()
				.get();
	}
}
