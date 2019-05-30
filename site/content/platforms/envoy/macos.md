+++
title = "Install Envoy on MacOS"
platform = "MacOS"
tags = []
categories = []
logo = "/images/macos.svg"
+++

## Installation ##

1. **Install `homebrew` (a one-time step).**
```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

1. **Install `envoy` from tetratelabs/getenvoy tap.**
```sh
$ brew tap tetratelabs/getenvoy
$ brew install tetratelabs/getenvoy/envoy
```

1. **Verify Envoy is installed.**
```sh
$ envoy --version
```

1. **Once installed, you can upgrade to a newer version of Bazel using the following command:**
```sh
$ brew upgrade tetratelabs/getenvoy/envoy
```

1. **To install nightly build of `envoy` (You might need to unlink the installed `envoy` before that)**
```sh
$ brew tap tetratelabs/getenvoy
$ brew install --HEAD tetratelabs/getenvoy/envoy
```
