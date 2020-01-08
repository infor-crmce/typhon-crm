#!groovy
node('windows && nodejs') {
  dir('typhon-sdk') {
    stage('Building typhon-sdk') {
      clonesdk(env.BRANCH_NAME)

      dir('deploy') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
      } catch (err) {
        slack.failure('Failed building typhon-sdk')
        throw err
      }
      dir('deploy') {
        stash includes: '**/*.*', name: 'sdk'
      }
    }

  }

  dir('products/typhon-crm') {
    stage ('Building typhon-crm') {
      try {
        checkout scm
      } catch (err) {
        slack.failure('Failed getting typhon-crm')
        throw err
      }

      dir('deploy') {
        deleteDir()
      }

      try {
        bat 'yarn'
        bat 'yarn run lint'
        bat 'build\\release.cmd'
        //bat 'yarn run testbasic'
      } catch (err) {
        slack.failure('Failed building typhon-crm')
        throw err
      }

      dir('deploy') {
        stash includes: '**/*.*', name: 'slx'
      }

      stage 'Creating bundles'
      try {
        bat 'grunt bundle'
        bat 'grunt lang-pack'

        dir('deploy') {
          stage 'Copying bundles'
          bat """robocopy . \\\\usdavwtldata.testlogix.com\\devbuilds\\builds\\mobile\\bundles\\%BRANCH_NAME%\\%BUILD_NUMBER%\\ *.zip /r:3 /w:5
              IF %ERRORLEVEL% LEQ 1 EXIT /B 0"""
        }
      } catch (err) {
        slack.failure('Failed building bundles.')
        throw err
      }
    }
  }
}

stage('Copying to IIS') {
  node('slx82') {
    iiscopy(env.BRANCH_NAME, env.BUILD_NUMBER)
  }
}

stage('Sending Slack notification') {
  node {
    slack.success('Mobile built successfully')
  }
}

void iiscopy(branch, build) {
  dir("C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build") {
    unstash 'slx'
    unstash 'sdk'
  }
  bat """%windir%\\SysNative\\WindowsPowerShell\\v1.0\\PowerShell.exe -NoProfile -NoLogo -ExecutionPolicy unrestricted -Command "C:\\inetpub\\wwwroot\\mobile-builds\\$branch\\$build\\scripts\\iis.ps1 -branch $branch -build $build" """
}

void clonesdk(branch, fallback='develop') {
  try {
    git branch: "$branch", url: 'https://github.com/Saleslogix/typhon-sdk.git'
  } catch(err) {
    try {
      git branch: "$fallback", url: 'https://github.com/Saleslogix/typhon-sdk.git'
    } catch(er) {
      slack.failure('Failed getting typhon-sdk')
      throw er
    }
  }
}
