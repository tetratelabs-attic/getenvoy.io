+++
title = "Run Envoy with Docker"
platform = "Docker"
tags = []
categories = []
logo = "/images/docker-logo.svg"
+++

## Requirements ##

Any Linux distribution with Docker installed.

## Installation ##

To use the `nightly` build instead, replace the word `stable` with `nightly`

1. **Pull latest docker image.
```
docker pull getenvoy/envoy:stable
```

1. **Verify Envoy image.**
```
$ docker run getenvoy/envoy:stable --version
```
