package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.model.Role;
import com.yerbnijse.webservice.repository.RoleRepository;
import com.yerbnijse.webservice.util.enums.Roles;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RoleService {
	private final RoleRepository roleRepository;

	public Role getDefaultUserRole() {
		return roleRepository.findByName("USER");
	}

	public Role getNotActive() {
		return roleRepository.findByName("NOT_VERIFIED");
	}

	public Role getRoleBy(Roles roles) {
		return roleRepository.getOne(roles.getId());
	}
}
