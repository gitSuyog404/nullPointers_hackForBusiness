FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR file
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9040

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]