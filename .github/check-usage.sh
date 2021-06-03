#!/bin/sh -ue

# Ensure CLI docs match latest GetEnvoy docs
usage_doc=$1
curl -sSL https://raw.githubusercontent.com/tetratelabs/getenvoy/master/site/usage.md > "${usage_doc}"

if [ "$(git status --porcelain -uno)" != "" ]; then
  echo "${usage_doc} needs to be updated to match tetratelabs/getenvoy:"
  git status --porcelain -v -uno
  git --no-pager diff
  exit 1
fi
