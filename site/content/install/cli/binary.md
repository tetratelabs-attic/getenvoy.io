+++
title = "Install GetEnvoy Binary"
environment = "Binary"
type = "install"
tags = []
categories = []
logo = "/images/linux.png"
toc = true
+++

## Requirements ##

GetEnvoy is supported on macOS and Linux.

## Installation ##

1. **Install CLI.**
```sh
$ curl -L https://getenvoy.io/install | bash -s -- -b /usr/local/bin
```
{{% notice warning %}}
If you install to a different location, ensure the binary is in your `$PATH` environment variable.
{{% /notice %}}

1. **Verify GetEnvoy is installed.**
```sh
$ getenvoy --help
```
