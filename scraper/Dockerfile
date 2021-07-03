FROM maven:3.6.3-openjdk-15
COPY . /server
WORKDIR /server
ENV WAIT_VERSION 2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN mvn install -DskipTests

EXPOSE 8081

CMD sh -c "/wait && mvn clean && mvn spring-boot:run -Dspring.profiles.active=local-docker"
