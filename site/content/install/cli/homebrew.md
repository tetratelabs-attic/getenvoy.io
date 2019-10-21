+++
title = "Install GetEnvoy using Homebrew"
environment = "Homebrew"
type = "install"
tags = []
categories = []
logo = "/images/macos.svg"
toc = true
+++

## Requirements ##

To install GetEnvoy via Homebrew, you need to have installed [Homebrew](https://brew.sh/).

{{% notice tip %}}
To install the binary without `homebrew` follow [these](/docs/install/cli/linux) instructions.
{{% /notice %}}

## Installation ##

1. **Add the Tetrate Homebrew GetEnvoy tap.**
```sh
$ brew tap tetratelabs/getenvoy
```
```sh-output
==> Tapping tetratelabs/getenvoy
Cloning into '/usr/local/Homebrew/Library/Taps/tetratelabs/homebrew-getenvoy'...
Tapped 1 formula.
```

1. **Install GetEnvoy.**
```sh
$ brew install getenvoy
```
```sh-output
==> Installing getenvoy from tetratelabs/getenvoy
==> Downloading ...
######################################################################## 100.0%
🍺  /usr/local/Cellar/getenvoy/0.1.1: 5 files, 25.9MB, built in 17 seconds
```

1. **Verify GetEnvoy is installed.**
```sh
$ getenvoy --help
```
