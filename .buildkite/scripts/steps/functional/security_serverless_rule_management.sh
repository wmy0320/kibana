#!/usr/bin/env bash

set -euo pipefail

source .buildkite/scripts/steps/functional/common.sh
source .buildkite/scripts/steps/functional/common_cypress.sh

export JOB=kibana-security-solution-chrome
export KIBANA_INSTALL_DIR=${KIBANA_BUILD_LOCATION}

echo "--- Rule Management Cypress Tests on Serverless"

cd x-pack/test/security_solution_cypress

set +e
yarn cypress:rule_management:run:serverless; status=$?; yarn junit:merge || :; exit $status
