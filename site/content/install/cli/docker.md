+++
title = "Run GetEnvoy with Docker"
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
```
$ docker pull getenvoy/getenvoy:standard-latest
```

1. **Verify Envoy image.**
```
$ docker run getenvoy/getenvoy:standard-latest --help
```
