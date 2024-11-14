# Usa una imagen base de OpenJDK 17
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia tu archivo WAR al directorio de trabajo en el contenedor
COPY bookloanspring/target/bookloanspring-0.0.1-SNAPSHOT.war /app/bookloanspring-0.0.1-SNAPSHOT.war

# Copia el archivo SQL a la ruta adecuada
COPY bookloanspring/src/main/resources/datasss.sql /app/datasss.sql

# Expone el puerto en el que la aplicación escuchará
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "bookloanspring-0.0.1-SNAPSHOT.war"]