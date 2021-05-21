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
To install the binary without `homebrew` follow [these](/install/cli/binary) instructions.
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
==> Downloading https://github.com/tetratelabs/getenvoy/releases/download/v0.3.0/getenvoy_0.3.0_darwin_amd64.tar.gz
==> Downloading from https://github-releases.githubusercontent.com/190627388/f2787c00-c3a3-11eb-95fd-56b0df61b4d0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CS
######################################################################## 100.0%
🍺  /usr/local/Cellar/getenvoy/0.3.0: 5 files, 7.4MB, built in 4 seconds
```

1. **Verify GetEnvoy is installed.**
```sh
$ getenvoy --version
```
