pipeline {
  agent any
  options {
    timestamps()
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        dir('subjects/final-year/agile/assignment_06_code') {
          sh 'npm ci'
        }
      }
    }
    stage('Test') {
      steps {
        dir('subjects/final-year/agile/assignment_06_code') {
          sh 'npm run test:junit'
        }
      }
    }
    stage('Analysis') {
      steps {
        dir('subjects/final-year/agile/assignment_06_code') {
          sh 'npm run coverage'
        }
      }
    }
    stage('Reporting') {
      steps {
        dir('subjects/final-year/agile/assignment_06_code') {
          junit 'reports/junit.xml'
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'coverage',
            reportFiles: 'index.html',
            reportName: 'Coverage Report'
          ])
          archiveArtifacts artifacts: 'reports/junit.xml, coverage/**', fingerprint: true
        }
      }
    }
  }
  post {
    always {
      echo "Pipeline finished with status ${currentBuild.currentResult}"
    }
    success {
      echo 'Build succeeded: tests and coverage reports are archived.'
    }
    failure {
      echo 'Build failed: check the Test or Analysis stage logs first.'
    }
  }
}
