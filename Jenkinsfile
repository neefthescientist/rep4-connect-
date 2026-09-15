pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    environment {
        // Replace this with your actual JFrog Docker registry/repository path.
        // Example: jfrog.example.com/docker-local
        JFROG_REGISTRY = 'artifactory.dso.sern.mil/artifactory/rep4connect/'

        IMAGE_NAME     = 'rep4-connect'
        IMAGE_TAG      = "${BUILD_NUMBER}"

        // This must exactly match the Jenkins credential ID.
        CREDENTIALS_ID = 'haneefat.adanijo'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Build Files') {
            steps {
                sh '''
                    set -eu

                    echo "Jenkins workspace: ${WORKSPACE}"
                    test -f Dockerfile
                    test -d frontend
                    test -f frontend/package.json
                    test -f frontend/package-lock.json
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -eu

                    docker build \
                      --file Dockerfile \
                      --tag "${JFROG_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}" \
                      .
                '''
            }
        }

        stage('Push to JFrog') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: env.CREDENTIALS_ID,
                        usernameVariable: 'JFROG_USER',
                        passwordVariable: 'JFROG_PASS'
                    )
                ]) {
                    sh '''
                        set -eu
                        set +x

                        echo "${JFROG_PASS}" | docker login "${JFROG_REGISTRY}" \
                          --username "${JFROG_USER}" \
                          --password-stdin

                        docker push "${JFROG_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"

                        docker tag \
                          "${JFROG_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}" \
                          "${JFROG_REGISTRY}/${IMAGE_NAME}:latest"

                        docker push "${JFROG_REGISTRY}/${IMAGE_NAME}:latest"

                        docker logout "${JFROG_REGISTRY}"
                    '''
                }
            }
        }
    }

    post {
        always {
            sh '''
                docker image rm -f \
                  "${JFROG_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}" \
                  "${JFROG_REGISTRY}/${IMAGE_NAME}:latest" || true
            '''
        }
    }
}