pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/krishundre/Random-Advice-Generator.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t random-advice-generator .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 --name random-advice-app random-advice-generator'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker ps -a'
            }
        }
    }
}
