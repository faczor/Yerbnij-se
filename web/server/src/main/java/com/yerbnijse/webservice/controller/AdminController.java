package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.Pagination;
import com.yerbnijse.webservice.model.dto.PagingResult;
import com.yerbnijse.webservice.model.dto.input.EmailInput;
import com.yerbnijse.webservice.model.dto.input.PasswordChangeInput;
import com.yerbnijse.webservice.model.dto.input.RoleChangeInput;
import com.yerbnijse.webservice.service.AdminService;
import com.yerbnijse.webservice.service.ScraperService;
import com.yerbnijse.webservice.service.UserService;
import com.yerbnijse.webservice.util.enums.PortalEnum;
import com.yerbnijse.webservice.util.enums.Roles;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
	private final ScraperService scraperService;
	private final AdminService adminService;

	@GetMapping("/offer/{WEBSITE}")
	public ResponseEntity<?> getNewProducts(@PathVariable(name = "WEBSITE") PortalEnum portalEnum) {
		scraperService.requestData(portalEnum);
		return ResponseEntity.ok("Wysłano prośbę o zescrapowanie portalu: " + portalEnum);
	}

	@GetMapping("/scrapers")
	public ResponseEntity<?> getPages(Pagination pagination) {
		return ResponseEntity.ok(scraperService.getPages(pagination));
	}

	@GetMapping("/users")
	public ResponseEntity<PagingResult> getUserList(
			@RequestParam(name = "userRole", required = false) Roles role,
			@RequestParam(name = "chIn", required = false) String chIn, Pagination pagination) {
		return ResponseEntity.ok(adminService.getUsers(role, chIn, pagination));
	}

	@PutMapping("/user/{uId}/activate")
	public ResponseEntity<Void> activateUser(@PathVariable(name = "uId") Long id) {
		adminService.activate(id);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/user/{uId}/remove")
	public ResponseEntity<Void> deleteUser(@PathVariable(name = "uId") Long id) {
		adminService.delete(id);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{uId}/change/email")
	public ResponseEntity<Void> changeEmailFor(@PathVariable(name = "uId") Long userId,
			@RequestBody @Valid EmailInput input) {
		adminService.changeEmail(userId, input.getEmail());
		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{uId}/reset/password")
	public ResponseEntity<Void> resetPassword(@PathVariable(name = "uId") Long userId) {
		adminService.resetPassword(userId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{uId}/change/password")
	public ResponseEntity<Void> changePassword(@PathVariable(name = "uId") Long userId,
			@RequestBody @Valid PasswordChangeInput input) {
		adminService.changePassword(userId, input);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{uId}/change/role")
	public ResponseEntity<Void> changePassword(@PathVariable(name = "uId") Long userId,
			@RequestBody RoleChangeInput input) {
		adminService.changeRole(userId, input.getRole());
		return ResponseEntity.ok().build();
	}
}
