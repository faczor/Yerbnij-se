# SERVER README.


### INITIAL STACK:

- MAVEN
- JAVA 15,
- SPRING BOOT 2.4,
- MYSQL 8,
- FLYWAY,
- SWAGGER,
- LOMBOK

### FLYWAY

- every migration should be placed in resources/migration,
- every migration name should be in same naming convention VX__SOME_MIGRATION

### MAVEN COMMANDS

- mvn spring-boot:run - running application
- mvn checkstyle:check - code analysis for errors in the code according to the google standard
- mvn process-sources - formatting code according to the google standard 

### SWAGGER UI

- path: /api-docs