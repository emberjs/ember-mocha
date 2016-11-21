#!/usr/bin/env bash

BUILDS_REPO="https://dgeb:${GH_TOKEN}@github.com/emberjs/ember-mocha-builds.git"

# Send output to /dev/null to prevent GH_TOKEN leak on error
git clone ${BUILDS_REPO} &> /dev/null
rm -rf ember-mocha-builds/*

npm run build

# Ensure that no directories within dist will be copied when script is run.
INCLUDED_FILES=`find dist -maxdepth 1 -type f`
echo -e "INCLUDED_FILES: ${INCLUDED_FILES}\n"
cp -r ${INCLUDED_FILES} ember-mocha-builds/

cd ember-mocha-builds

git config user.email "tomster@emberjs.com"
git config user.name "Tomster"

git add --all
git commit --message="Release ${TRAVIS_TAG}"
git tag "${TRAVIS_TAG}"

# Send output to /dev/null to prevent GH_TOKEN leak on error
git push --quiet --force origin master --tags &> /dev/null

echo -e "Done\n"
