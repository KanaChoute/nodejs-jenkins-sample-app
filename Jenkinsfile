pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "jenkins-demo-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            // TODO: Récupérer le code source
            check scm
        }
        
        stage('Install Dependencies') {
            // TODO: Installer les dépendances
            sh 'npm ci'
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
                sh "docker build -t nodejs-jenkins-sample-app ."
            }
        }
        
        stage('Deploy') {
            steps {
                // Arrête et supprime l'ancien conteneur s'il existe
                sh 'echo "Deploying application..."'
            }
        }
    
    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
