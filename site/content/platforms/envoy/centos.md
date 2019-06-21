+++
title = "Install Envoy on CentOS"
platform = "CentOS"
tags = []
categories = []
logo = "/images/centos-logo-light.png"
+++

## Requirements ##

Envoy is supported on CentOS 7 and above.

## Installation ##

1. **Install yum-config-manager utility.**
```sh
$ sudo yum install -y yum-utils
```

1. **Add yum repository config.**
```sh
$ sudo yum-config-manager --add-repo https://getenvoy.io/linux/centos/tetrate-getenvoy.repo
```
To install nightly packages instead, enable the nightly repository configuration.
```sh
$ sudo yum-config-manager --enable tetrate-getenvoy-nightly
```
To disable nightly repository configuration, run the following command.
```sh
$ sudo yum-config-manager --disable tetrate-getenvoy-nightly
```

1. **Install Envoy binary.**
```sh
$ sudo yum install -y getenvoy-envoy
```

1. **Verify Envoy is installed.**
```sh
$ envoy --version
```
