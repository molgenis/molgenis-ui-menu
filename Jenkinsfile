pipeline {
  agent {
    kubernetes {
      label 'node-carbon'
    }
  }
  stages {
    stage('Prepare') {
      steps {
        script {
          env.GIT_COMMIT = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        }
        container('vault') {
          script {
            env.TUNNEL_IDENTIFIER = sh(script: 'echo ${GIT_COMMIT}-${BUILD_NUMBER}', returnStdout: true)
            env.GITHUB_TOKEN = sh(script: 'vault read -field=value secret/ops/token/github', returnStdout: true)
            env.CODECOV_TOKEN = sh(script: 'vault read -field=value secret/ops/token/codecov', returnStdout: true)
            env.SAUCE_CRED_USR = sh(script: 'vault read -field=username secret/ops/token/saucelabs', returnStdout: true)
            env.SAUCE_CRED_PSW = sh(script: 'vault read -field=value secret/ops/token/saucelabs', returnStdout: true)
            env.NPM_TOKEN = sh(script: 'vault read -field=value secret/ops/token/npm', returnStdout: true)
            env.NPM_LOCAL_TOKEN = sh(script: 'vault read -field=value secret/ops/token/nexus', returnStdout: true)
          }
        }
        container('node') {
          sh "daemon --name=sauceconnect -- /usr/local/bin/sc -u ${SAUCE_CRED_USR} -k ${SAUCE_CRED_PSW} -i ${TUNNEL_IDENTIFIER}"
        }
      }
    }
    stage('Build: [ pull request ]') {
      when {
        changeRequest()
      }
      steps {
        container('node') {
          sh "yarn install"
          sh "yarn test:unit"
          sh "yarn test:e2e --env ci_chrome,ci_safari,ci_ie11,ci_firefox"
        }
      }
      post {
        always {
          container('node') {
            sh "curl -s https://codecov.io/bash | bash -s - -c -F unit -K"
          }
        }
      }
    }
    stage('Build: [ master ]') {
      when {
        branch 'master'
      }
      steps {
        milestone 1
        container('node') {
          sh "yarn install"
          sh "yarn test:unit"
          sh "yarn test:e2e"
        }
      }
      post {
        always {
          container('node') {
            sh "curl -s https://codecov.io/bash | bash -s - -c -F unit -K"
          }
        }
      }
    }
    stage('Release: [ master ]') {
      when {
        branch 'master'
      }
      environment {
        REPOSITORY = 'molgenis/molgenis-ui-menu'
      }
      steps {
        timeout(time: 30, unit: 'MINUTES') {
          script {
            env.RELEASE_SCOPE = input(
              message: 'Do you want to release?',
              ok: 'Release',
              parameters: [
                choice(choices: 'patch\nminor\nmajor', description: '', name: 'RELEASE_SCOPE')
              ]
            )
          }
        }
        milestone 2
        container('node') {
          sh "git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

          sh "git checkout -f ${BRANCH_NAME}"

          sh "npm config set unsafe-perm true"
          sh "npm config set registry ${env.NPM_REGISTRY}/:_authToken=${env.NPM_TOKEN}"

          sh "npm version ${RELEASE_SCOPE} -m '[ci skip] [npm-version] %s'"

          sh "git push --tags origin ${BRANCH_NAME}"

          sh "npm publish"
          hubotSend(message: '${env.REPOSITORY} has been successfully deployed on ${env.NPM_REGISTRY}.', status: 'SUCCESS')
        }
      }
    }
    stage('Steps: [ feature ]') {
      when {
        expression { BRANCH_NAME ==~ /feature\/.*/ }
      }
      environment {
        TAG = "$BRANCH_NAME-$BUILD_NUMBER".replaceAll(~/[^\w.-]/, '-').toLowerCase()
      }
      stages {
        stage('Build: [ feature ]') {
          steps {
            container('node') {
              sh "yarn install"
              sh "yarn test:unit"
              sh "yarn test:e2e --env ci_chrome,ci_safari,ci_ie11,ci_firefox"
            }
          }
        }
        stage('Release: [ feature ]') {
          steps {
            timeout(time: 30, unit: 'MINUTES') {
              script {
                env.RELEASE_SCOPE = input(
                  message: 'Do you want to release?',
                  ok: 'Release',
                  parameters: [
                    choice(choices: 'patch\nminor\nmajor', description: '', name: 'RELEASE_SCOPE')
                  ]
                )
              }
            }
            milestone 1
            container('node') {
//              sh "git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPOSITORY}.git"

              sh "git checkout -f ${BRANCH_NAME}"

              sh "npm config set unsafe-perm true"
              sh "npm config set tag-version-prefix '${BRANCH_NAME}'"
              sh "npm config set registry ${env.NPM_LOCAL_REGISTRY}:_authToken=${env.NPM_LOCAL_TOKEN}"

              sh "npm version ${RELEASE_SCOPE} -m '[ci skip] [npm-version] %s'"

//              sh "git push --tags origin ${BRANCH_NAME}"

              sh "npm --registry ${env.NPM_LOCAL_REGISTRY} publish"
              hubotSend(message: '${env.REPOSITORY} has been successfully deployed on ${env.NPM_LOCAL_REGISTRY}.', status: 'SUCCESS')
            }
          }
        }
      }

    }
  }
  post {
    always {
      container('node') {
        sh "daemon --name=sauceconnect --stop"
      }
    }
    success {
      notifySuccess()
    }
    failure {
      notifyFailed()
    }
  }
}

def notifySuccess() {
  hubotSend(message: 'Build success', status: 'INFO', site: 'slack-pr-app-team')
}

def notifyFailed() {
  hubotSend(message: 'Build failed', status: 'ERROR', site: 'slack-pr-app-team')
}
