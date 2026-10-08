# Assignment 06 — CI/CD pipeline target

Compact Digital Library Management System test project used as the build target
for both the Jenkins pipeline and the GitHub Actions workflow.

## Contents

- `src/loginValidation.js`, `src/bookValidation.js` — modules under test
- `src/*.test.js` — six Vitest cases (three per module)
- `vitest.config.js` — JUnit output to `reports/junit.xml`, HTML/LCOV/Cobertura
  coverage output to `coverage/`
- `Jenkinsfile` — declarative pipeline: Checkout, Build, Test, Analysis, Reporting
- `.github/workflows/ci.yml` — Actions workflow for push and pull_request

## Local verification

Prerequisite: Node 22.

Run: npm ci

Run: npm test

Run: npm run coverage

JUnit report appears at `reports/junit.xml` after `npm run test:junit` or
`npm run coverage:ci`. The HTML coverage report appears at
`coverage/index.html` after `npm run coverage`.

Validate the Actions workflow YAML:

Run: python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))"

## Jenkinsfile syntax check

No Jenkins server or jenkinsfile-linter was available in this workspace, so the
Jenkinsfile was not machine-validated here. Validate it one of these ways:

- Jenkins server linter endpoint:
  curl --user USER:TOKEN -X POST -F "jenkinsfile=<Jenkinsfile>"
  https://JENKINS_URL/pipeline-model-converter/validate
- VS Code with the Jenkins Pipeline Linter Connector extension.
- Docker validator image, for example:
  docker run --rm -v "$PWD:/ws" jenkins/jenkinsfile-runner \
    -f /ws/subjects/final-year/agile/assignment_06_code/Jenkinsfile --help

Required Jenkins plugins: JUnit, HTML Publisher, Pipeline.

## Real trigger wiring

GitHub Actions reads workflows only from the repository root `.github`
directory, so copy `.github/workflows/ci.yml` to the repository root to get
real push and pull_request triggers. The Jenkinsfile is picked up by a Jenkins
multibranch or pipeline job pointed at this repository.
