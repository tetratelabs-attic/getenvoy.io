+++
title = "Install Envoy on CentOS"
platform = "CentOS"
tags = []
categories = []
logo = "/images/centos.png"
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
Nightly packages can be enabled using the `--enable` flag. To disable again, use the `--disable` flag.
```sh
$ sudo yum-config-manager --enable tetrate-getenvoy-nightly
```

1. **Install Envoy binary.**
```sh
$ sudo yum install -y getenvoy-envoy
```

1. **Verify Envoy is installed.**
```sh
$ envoy --version
```
