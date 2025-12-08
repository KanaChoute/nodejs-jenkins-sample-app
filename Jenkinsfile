pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "jenkins-demo-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = "jenkins-demo-app"
    }
    
    stages {
        stage('Checkout') {
            // TODO: Récupérer le code source
            steps {
                git url: 'https://github.com/KanaChoute/nodejs-jenkins-sample-app.git',
                    branch: 'docker'
            }
        }
        
        stage('Install Dependencies') {
            // TODO: Installer les dépendances
            steps {
                sh 'npm install'
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
                script {
                    sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    docker run -d\
                        --name ${CONTAINER_NAME}\
                        -p 3000:3000 \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
            }
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
