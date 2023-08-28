# # Use a Java 8 base image
# FROM openjdk:8-jre-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the Spring Boot JAR file into the container
# COPY target/student-management-system-1.0.jar /app/app.jar

# # Expose the port that the Spring Boot application listens on (adjust as needed)
# EXPOSE 8080

# # Command to run the Spring Boot application
# CMD ["java", "-jar", "app.jar"]

EXPOSE 8080
#
# Build stage
#
FROM maven:3.8.2-jdk-8 AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:8-jdk-slim
COPY --from=build target/student-management-system-1.0.jar demo.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","demo.jar"]
