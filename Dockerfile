FROM openjdk:8

COPY --from=build /target/student-management-system-1.0.jar demo.jar
ENTRYPOINT ["java", "-jar","myapplication"]
EXPOSE 8080
