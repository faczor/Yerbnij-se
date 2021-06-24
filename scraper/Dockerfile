FROM openjdk:15-jdk-buster

RUN apt update && apt install -y maven && mvn install -DskipTests

EXPOSE 8081

CMD mvn clean && mvn spring-boot:run -Dspring.profiles.active=local
