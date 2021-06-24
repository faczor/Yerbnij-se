package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.util.enums.Roles;
import lombok.Getter;

@Getter
public class RoleChangeInput {
  private Roles role;
}
