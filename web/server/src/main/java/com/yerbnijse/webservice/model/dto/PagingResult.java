package com.yerbnijse.webservice.model.dto;

import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

/**
 * Class which purpose is to pull out essential data from Page object, and List
 * of Entities
 * 
 * @author Sebastian Druciak
 * @see DtoWithPaging
 * @see Pagination
 */
@Getter
public class PagingResult {
	private List<?> content;
	private PageData data;

	/**
	 * @param page
	 *            object of Page from JpaRepository
	 * @param type
	 *            Class we want to map to
	 * @param castFrom
	 *            Class we want to map
	 * @throws ClassCastException
	 *             when Content from Page is not instance of castFrom Param
	 */
	public static PagingResult from(Page<?> page, Class<?> type, Class<?> castFrom) {
		PagingResult result = new PagingResult();
		result.setContent(page, type, castFrom);
		result.setData(page);
		return result;
	}

	private void setContent(Page<?> page, Class<?> type, Class<?> castFrom) {
		List<?> content = page.getContent();
		if (content.isEmpty()) {
			this.content = Collections.emptyList();
			return;
		}
		if (castFrom.isInstance(content.get(0))) {
			this.content = getDto(content, type);
		} else {
			throw new ClassCastException("Wrong cast type in PagingResult from. Content passed: "
					+ content.get(0).getClass() + ", classFrom param: " + castFrom);
		}
	}

	private void setData(Page<?> page) {
		this.data = new PageData(page.getTotalPages(), page.getTotalElements(), page.getNumber(), page.getSize());
	}

	@SuppressWarnings("unchecked") // Warning is checked in setContent method.
	private static List<DtoWithPaging> getDto(List<?> dto, Class<?> type) {
		try {
			return (List<DtoWithPaging>) type.getDeclaredMethod("toDtoResult", List.class).invoke(type.newInstance(),
					dto);
		} catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException
				| InstantiationException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Getter
	@AllArgsConstructor(access = AccessLevel.PRIVATE)
	private static class PageData {
		private final int totalPages;
		private final long totalElements;
		private final int page;
		private final int size;
	}
}
