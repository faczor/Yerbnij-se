package com.yerbnijse.webservice.model.dto;

import java.util.List;

/**
 * An interface that you need to extend for views with paging if you want to use
 * PagingResult.
 * 
 * @author Sebastian Druciak
 * @see PagingResult
 * @see Pagination
 */
public interface DtoWithPaging {

	/**
	 * Method whose purpose is to map Entity to Dto obj. You can annotate method
	 * with @SuppressWarnings("unchecked") because casting is checked in
	 * PagingResult
	 * 
	 * @see PagingResult
	 * @param data
	 *            List of Entity object that you want to map.
	 * @return List of mapped objects from Entity to Dto
	 */
	List<DtoWithPaging> toDtoResult(List<?> data);
}
