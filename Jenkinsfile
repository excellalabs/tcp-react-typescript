pipeline {
  agent {
    kubernetes {
      yaml """
      apiVersion: v1
      kind: Pod
      spec:
        serviceAccountName: jenkins-agent
        containers:
        - name: node
          image: cypress/base:14.5.0
          tty: true
          command:
          - cat
        - name: kaniko
          image: gcr.io/kaniko-project/executor:v1.6.0-debug
          tty: true
          command:
          - sleep
          args:
          - 99d
          volumeMounts:
          - name: docker-config
            mountPath: /kaniko/.docker/
        - name: terraform
          image: hashicorp/terraform:1.0.0
          tty: true
          command: ['cat']
        - name: helm
          image: alpine/helm:3.6.2
          tty: true
          command: ['cat']
        - name: tfsec
          image: tfsec/tfsec-ci:v0.47.0
          tty: true
          command: ['cat']              
          securityContext:
            runAsUser: 0
        - name: sonar
          image: sonarsource/sonar-scanner-cli:4.6
          tty: true
          command: ['cat']
        volumes:
        - name: docker-config
          configMap:
            name: docker-config
      """.stripIndent()
    }
  }
  environment {
    CI = 'true'
    IMAGE = 'frontend'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Download Dependencies') {
      steps {
        container('node') {
          sh """
          npm install
          """
        }
      }
    }

    stage('Lint') {
      steps {
        container('node') {
          sh """
          npm run lint
          """
        }
      }
    }

    stage('Test') {
      steps {
        container('node') {
          sh """
          npm test
          """
        }
      }
    }

    stage('Cypress') {
      steps {
        container('node') {
          sh """
          npm run test:cypress
          """
        }
      }
    }

    // stage('SonarQube') {
    //   steps {
    //     container('sonar') {
    //       withSonarQubeEnv('sonarqube') {
    //         sh """
    //         sonar-scanner -Dsonar.projectKey="frontend"
    //         """
    //       }
    //     }
    //   }
    // }

    stage('Build') {
      steps {
        container('kaniko') {
          sh """#!/busybox/sh
          /kaniko/executor -f `pwd`/Dockerfile.prod -c `pwd` --cache=true --destination=${ECR_HOST}/didit/${IMAGE}:${GIT_COMMIT}
          """
        }
      }
    }

    stage('Scan Infrastructure') {
      steps {
        container('tfsec') {
          sh """
          tfsec infrastructure/terraform --no-color --exclude-downloaded-modules
          """
        }
      }
    }

   stage('Deploy Dev') {
      steps {
        script {
          container('terraform') {
            withEnv(["TF_VAR_cluster=${PROJECT}", "TF_VAR_project=${PROJECT}_dev", "TF_VAR_region=${AWS_REGION}", "TF_CLI_ARGS=-no-color"]) {
              dir('infrastructure/terraform') {
                sh """set +x
                terraform init -backend-config bucket=${STATE_BUCKET} -backend-config dynamodb_table=${STATE_TABLE}
                terraform plan -out tfplan -var "kube_sa_token=\$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)"
                terraform apply -auto-approve tfplan
                """
              }
            }
          }

          withVault([vaultSecrets: secrets]) {
            container('helm') {
              dir('infrastructure/helm') {
                sh """set +x
                helm upgrade --install frontend . -n dev --set ecrHost=\${ECR_HOST}/didit/\${IMAGE} --set tag=\${GIT_COMMIT} --set project=\${PROJECT}_dev
                """
              }
            }
          } // withVault
        } // script
      } // steps
    } // stage

    stage('Deploy Test') {
      steps {
        script {
          container('terraform') {
            withEnv(["TF_VAR_cluster=${PROJECT}", "TF_VAR_project=${PROJECT}_test", "TF_VAR_region=${AWS_REGION}", "TF_CLI_ARGS=-no-color"]) {
              dir('infrastructure/terraform') {
                sh """set +x
                terraform init -backend-config bucket=${STATE_BUCKET} -backend-config dynamodb_table=${STATE_TABLE}
                terraform plan -out tfplan -var "kube_sa_token=\$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)"
                terraform apply -auto-approve tfplan
                """
              }
            }
          }

          withVault([vaultSecrets: secrets]) {
            container('helm') {
              dir('infrastructure/helm') {
                sh """set +x
                helm upgrade --install frontend . -n test --set ecrHost=\${ECR_HOST}/didit/\${IMAGE} --set tag=\${GIT_COMMIT} --set project=\${PROJECT}_test
                """
              }
            }
          } // withVault
        } // script
      } // steps
    } // stage
  }
}
