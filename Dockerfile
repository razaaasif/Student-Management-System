FROM maven:3.6.3-jdk-8 AS build
COPY . .
RUN mvn clean package -DskipTests
FROM openjdk:8-jre-slim
EXPOSE 8080
COPY --from=build /target/student-management-system-1.0.jar demo.jar
ENTRYPOINT [ "java","-jar","demo.jar" ]