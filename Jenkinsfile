pipeline {
    agent any

    environment {
        JFROG_REGISTRY = 'your-company.jfrog.io'
        IMAGE_NAME = 'rep4-connect'
        BUILD_TAG = "${env.BUILD_NUMBER}"
        CREDENTIALS_ID = 'jfrog-credentials'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${JFROG_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG} ."
            }
        }

        stage('Push to JFrog') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${CREDENTIALS_ID}", passwordVariable: 'JFROG_PASS', usernameVariable: 'JFROG_USER')]) {
                    sh "echo \$JFROG_PASS | docker login ${JFROG_REGISTRY} -u \$JFROG_USER --password-stdin"
                    sh "docker push ${JFROG_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG}"
                    sh "docker tag ${JFROG_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG} ${JFROG_REGISTRY}/${IMAGE_NAME}:latest"
                    sh "docker push ${JFROG_REGISTRY}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
}