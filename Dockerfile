# Stage 1: Build the application
FROM maven:3.8.4 as build
WORKDIR /app
COPY . .
RUN mvn package -DskipTests

# Stage 2: Create the final image
FROM openjdk:8-jre-slim
WORKDIR /app
COPY --from=build /app/target/student-management-system-1.0.jar demo.jar
ENTRYPOINT ["java", "-jar", "demo.jar"]
EXPOSE 8080
