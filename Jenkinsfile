node('kraken') {
    try {
        stage 'Checkout'
        deleteDir()
        sh 'rm -rf videos/'
        sh 'env'
        checkout scm
        sh 'pwd'
        sh 'ls -lah'
        sh 'ls -lah videos || true'
        sh 'docker ps -a || true'
        sh 'docker volume ls || true'

        stage 'Remove volumes'
        sh 'docker volume rm $(docker volume ls -qf dangling=true) || true'

        stage 'Running in Parallel'
        try {
            sh '/tools/run-with-selenium :maven -- bash -c "cd running-in-parallel/java-testng/complete; mvn clean test -DthreadCountProperty=2"'
            currentBuild.result = "SUCCESS"
        } catch (e) {
            currentBuild.result = "FAILURE"
            throw e
        }

    } finally {
        stage "Status"
        emailext ([
                to: "diego.fernando.molina.bocanegra",
                subject: "${env.JOB_NAME}#${env.BUILD_NUMBER} - ${currentBuild.result}",
                body: "Use triple double-quotes for multiline text",
                mimeType: 'text/html',
                charset: 'UTF-8',
                attachLog: true
        ])
        // sh 'cd /; ls -lah **/**'
        sh '/tools/run :frontend -v /tmp/videos:/tmp/videos -- ls -la /tmp/videos'
        archiveArtifacts allowEmptyArchive: true, artifacts: '**/videos/**, *.log, logs/*, reports/**, videos/*.html, videos/*.css, videos/*.ico'
        publishHTML (target: [
                reportName: "Zalenium",
                reportDir: 'videos',
                reportFiles: 'dashboard.html',
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true
        ])
    }
}