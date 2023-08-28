FROM openjdk:8
ADD target/*.jar myapplication
ENTRYPOINT ["java", "-jar","myapplication"]
EXPOSE 8080
