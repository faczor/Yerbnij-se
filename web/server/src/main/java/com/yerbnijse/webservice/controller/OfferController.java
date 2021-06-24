package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.Pagination;
import com.yerbnijse.webservice.model.dto.input.FavouriteInput;
import com.yerbnijse.webservice.model.dto.input.OfferInput;
import com.yerbnijse.webservice.service.OfferService;
import com.yerbnijse.webservice.util.enums.PortalEnum;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/offer")
@CrossOrigin(origins = "*")
public class OfferController {

  private final OfferService offerService;

  @GetMapping
  public ResponseEntity<?> getOffers(
      @RequestParam(name = "productName", required = false) String search,
      @RequestParam(name = "portal", required = false) PortalEnum portalEnum,
      @RequestParam(name = "amountFrom", defaultValue = "0") Integer amountFrom,
      @RequestParam(name = "amountTo", defaultValue = "99999") Integer amountTo,
      @RequestParam(name = "priceFrom", defaultValue = "0") Integer priceFrom,
      @RequestParam(name = "priceTo", defaultValue = "99999") Integer priceTo,
      Pagination pagination) {
    return ResponseEntity.ok(offerService.get(search, portalEnum, amountFrom, amountTo, priceFrom, priceTo, pagination));
  }

  @PostMapping("/add")
  public ResponseEntity<?> getWholesalerData(@RequestBody List<OfferInput> input) {
    offerService.fillWithData(input);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/{id}/reaction")
  public ResponseEntity<?> addFavourite(@PathVariable(name = "id") Long offerId,
      @RequestBody FavouriteInput input) {
    offerService.setFavourite(offerId, input);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/{id}/favourite")
  public ResponseEntity<?> switchFavourite(@PathVariable(name = "id") Long offerId) {
    offerService.switchFavourite(offerId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{id}/details")
  public ResponseEntity<?> getDetails(@PathVariable(name = "id") Long offerId) {
    return ResponseEntity.ok(offerService.getDetails(offerId));
  }
}
