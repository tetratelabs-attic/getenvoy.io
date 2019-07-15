+++
title = "Run Envoy with Docker"
platform = "Docker"
tags = []
categories = []
logo = "/images/docker.svg"
+++

## Requirements ##

Any host OS on x86-64 architecture with Docker installed.

## Installation ##

1. **Pull the latest docker image.**
```
$ docker pull getenvoy/envoy:stable
```

1. **Verify Envoy image.**
```
$ docker run getenvoy/envoy:stable --version
```

To use the `nightly` build instead, replace the word `stable` with `nightly`
