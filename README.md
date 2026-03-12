# StreamVid: Plateforme de Streaming Vidéo Fullstack

Ce projet est une application de streaming vidéo complète utilisant une architecture microservices pour le backend et React.js pour le frontend.

## Architecture du Projet
Le projet est organisé en **monorepo** :
- `/backend` : Contient les microservices Spring Boot.
- `/frontend` : Contient l'application React.js.

### Technologies
- **Backend** : Java 17, Spring Boot 3.4.3, Spring Cloud 2024.0.0, Eureka, Config Server, API Gateway, OpenFeign, MySQL.
- **Frontend** : React.js, Axios, Tailwind CSS.
- **Orchestration** : Docker, Docker Compose.

## Lancement Rapide (Docker)
1. Assurez-vous que Docker Desktop est démarré.
2. Compilez le backend :
   ```bash
   cd backend
   mvn clean package -DskipTests
   cd ..
   ```
3. Démarrez l'infrastructure complète :
   ```bash
   docker-compose up --build
   ```

## Microservices
1. **Config Service (8888)** : Centralise la configuration depuis `/backend/config-repo`.
2. **Discovery Service (8761)** : Annuaire des services (Eureka).
3. **Gateway Service (8222)** : Point d'accès unique et gestion CORS.
4. **Video Service (8081)** : Gestion du catalogue vidéo.
5. **User Service (8082)** : Gestion des utilisateurs, watchlists et historique.

## Frontend
L'application React est configurée pour communiquer avec le `gateway-service` sur le port `8222`. Tous les endpoints métier sont accessibles via ce port.
