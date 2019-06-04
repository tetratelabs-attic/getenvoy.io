+++
title = "Install Envoy on Ubuntu"
platform = "Ubuntu"
tags = []
categories = []
logo = "/images/ubuntu_black-orange_hex_su.svg"
+++

## Installation ##

1. **Update `apt` index.**
```sh
$ sudo apt-get update
```

1. **Install packages required for `apt` to communicate via HTTPS.**
```sh
$ sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common
```

1. **Add the Tetrate GPG key.**
```sh
$ curl -sL 'https://getenvoy.io/gpg' | sudo apt-key add -
```

1. **Verify the key has the fingerprint `5270 CEAC 57F6 3EBD 9EA9  005D 0253 D0B2 6FF9 74DB`.**
```sh
$ sudo apt-key fingerprint 6FF974DB
pub   4096R/6FF974DB 2019-03-01
      Key fingerprint = 5270 CEAC 57F6 3EBD 9EA9  005D 0253 D0B2 6FF9 74DB
uid                  GetEnvoy <getenvoy@tetrate.io>
sub   4096R/7767A960 2019-03-01
```

1. **Add the stable repository.**
To add the `nightly` repository instead, replace the word `stable` with `nightly`.
```sh
$ sudo add-apt-repository \
  "deb [arch=amd64] https://dl.bintray.com/tetrate/getenvoy-deb \
  $(lsb_release -cs) \
  stable"
```

1. **Install Envoy binary.**
```sh
$ sudo apt-get update && sudo apt-get install -y getenvoy-envoy
```

1. **Verify Envoy is installed.**
```sh
$ envoy --version
```
