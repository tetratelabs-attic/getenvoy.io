+++
title = "Run Envoy with Docker"
environment = "Docker"
type = "install"
tags = []
categories = []
logo = "/images/docker.svg"
toc = true
+++

## Requirements ##

Any host OS on x86-64 architecture with Docker installed.

## Installation ##

1. **Pull the latest docker image.**
```sh
$ docker pull getenvoy/envoy:stable
```

1. **Verify Envoy image.**
```sh
$ docker run getenvoy/envoy:stable --version
```

{{% notice tip %}}
To use the `nightly` build instead, replace the word `stable` with `nightly`
{{% /notice %}}
