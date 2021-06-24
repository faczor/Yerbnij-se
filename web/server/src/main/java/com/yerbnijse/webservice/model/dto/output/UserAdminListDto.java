package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.dto.DtoWithPaging;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class UserAdminListDto implements DtoWithPaging {

  private Long id;
  private String name;
  private String surname;
  private String email;
  private String role;
  private String provider;

  @Override
  public List<DtoWithPaging> toDtoResult(List<?> data) {
    List<User> users = (List<User>) data;
    return users.stream().map(UserAdminListDto::from).collect(Collectors.toList());
  }

  private static UserAdminListDto from(User user) {
    UserAdminListDto dto = new UserAdminListDto();
    dto.id = user.getId();
    dto.name = user.getName();
    dto.surname = user.getSurname();
    dto.provider = user.getAuthProvider().name();
    dto.email = user.getEmail();
    dto.role = user.getRole().getName();
    return dto;
  }
}
