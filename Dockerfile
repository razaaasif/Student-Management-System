FROM openjdk:88
ADD target/*.jar myapplication
ENTRYPOINT ["java", "-jar","myapplication"]
EXPOSE 8080
