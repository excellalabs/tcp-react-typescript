pipeline {
  agent any;
  environment {
    REPO = credentials("frontend-ecr-repository")
    IMAGE_ID = "${REPO}:${BUILD_ID}"
  }
  stages {
    stage('Run Unit Tests') {
      agent {
        kubernetes {
          defaultContainer "node"
          yaml """
kind: Pod
metadata:
  name: node-build
spec:
  containers:
    - name: node
      image: node:14.5.0
      imagePullPolicy: IfNotPresent
      command:
        - cat
      tty: true
"""
        }
      }
      steps {
        sh 'npm i'
        sh 'npm run test:ci'
      }
    }
    stage('Build Image & Push to ECR') {
      agent {
        kubernetes {
          defaultContainer 'builder'
          yaml """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: builder
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      configMap:
        name: docker-config
"""
      }
    }
    steps {
      sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=${IMAGE_ID}"
      }
    }
    stage('Deploy'){
      agent {
        kubernetes {
          defaultContainer "kubectl"
          yaml """
kind: Pod
metadata:
  name: kubectl
spec:
  containers:
    - name: kubectl
      image: codefresh/kube-helm
      imagePullPolicy: IfNotPresent
      tty: true
      command:
        - cat
  serviceAccountName: jenkins-deployer
"""
        }
      }
      steps {
        sh """
          cd kubernetes
          sed -i 's,{{IMAGE_ID}},${IMAGE_ID},g' deployment.yaml
          kubectl apply -f deployment.yaml
        """
      }
    }
  }
}