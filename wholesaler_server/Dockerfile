FROM openjdk:15-jdk-buster

COPY . /wholesaler_server

WORKDIR /wholesaler_server

RUN apt update && apt install -y maven && mvn install -DskipTests

EXPOSE 8082

CMD sleep 30 && mvn clean && mvn spring-boot:run -Dspring.profiles.active=docker
