package com.yerbnijse.webservice.repository;

import com.yerbnijse.webservice.model.Offer;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
	Optional<Offer> findByNameAndAmount(String name, Integer amount);

	@Query(nativeQuery = true, value = "" + "SELECT * FROM Offers WHERE "
			+ "(:search IS NULL OR Name LIKE %:search%) AND " + "(:portal IS NULL OR PortalId = :portal) AND "
			+ "(price BETWEEN :priceFrom AND :priceTo) AND " + "(amount BETWEEN :amountFrom AND :amountTo)")
	Page<Offer> findBy(String search, Integer portal, Integer amountFrom, Integer amountTo, Integer priceFrom,
			Integer priceTo, Pageable pageable);
}
