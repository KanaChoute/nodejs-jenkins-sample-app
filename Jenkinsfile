pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "jenkins-demo-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = "jenkins-demo-app"
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Récupère le code depuis le repo Git configuré dans Jenkins
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Installe les dépendances Node.js du package.json
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Exécute les tests unitaires définis dans package.json
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Construit l'image Docker avec le tag BUILD_NUMBER
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                // Arrête et supprime l'ancien conteneur s'il existe
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                // Démarre le nouveau conteneur avec la nouvelle version
                sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
    }
}
