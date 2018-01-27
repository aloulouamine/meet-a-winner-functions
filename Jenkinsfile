pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm --prefix functions install'
            }
        }
        stage('Make Quality') {
            when {
                branch 'master'
            }
            steps {
                sh 'npm --prefix functions run lint'

                script {
                    def scannerHome = tool 'SonarQube Scanner';
                    withSonarQubeEnv('SonarQube Server') {
                      sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm --prefix functions run build'
            }
        }
        stage('Deploy') {
            environment {
                FIREBASE_TOKEN = credentials('FIREBASE_TOKEN_MAW')
            }
            when {
                branch 'master'
            }
            steps {
                sh 'npm --prefix functions run deploy --token $FIREBASE_TOKEN'
            }
        }
    }
}