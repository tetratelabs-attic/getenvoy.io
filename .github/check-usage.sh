#!/bin/sh -ue

# Ensure CLI docs match latest func-e docs
usage_doc=$1
curl -sSL https://raw.githubusercontent.com/tetratelabs/func-e/master/USAGE.md > "${usage_doc}"

if [ "$(git status --porcelain -uno)" != "" ]; then
  echo "${usage_doc} needs to be updated to match tetratelabs/func-e:"
  git status --porcelain -v -uno
  git --no-pager diff
  exit 1
fi
