+++
title = "Install Envoy on MacOS"
platform = "MacOS"
tags = []
categories = []
logo = "/images/macos.svg"
+++

## Installation ##

1. **Install [Homebrew](https://brew.sh/).**
```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

1. **Add the Tetrate Homebrew GetEnvoy tap.**
```sh
$ brew tap tetratelabs/getenvoy
```
```sh-output
==> Tapping tetratelabs/getenvoy
Cloning into '/usr/local/Homebrew/Library/Taps/tetratelabs/homebrew-getenvoy'...
Tapped 1 formula.
```

1. **Install Envoy binary.**
To install the `nightly` version instead, add `--HEAD` flag to the install command.
```sh
$ brew install envoy
```
```sh-output
==> Installing envoy from tetratelabs/getenvoy
==> Downloading ...
######################################################################## 100.0%
🍺  /usr/local/Cellar/envoy/1.10.0: 3 files, 27.9MB, built in 13 seconds
```

1. **Verify Envoy is installed.**
```sh
$ envoy --version
```
