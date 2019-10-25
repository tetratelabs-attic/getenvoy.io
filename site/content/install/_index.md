+++
title = "Installation"
type = "install"
layout = "install"
toc = true
+++

Installing and running `getenvoy` on Linux and macOS is as easy as:

```sh
$ curl -L https://getenvoy.io/cli | bash -s -- -b /usr/local/bin
$ getenvoy run standard:1.11.2 -- --version
```

The CLI is also available via [Homebrew]({{< relref "cli/homebrew">}}) and [Docker]({{< relref "cli/docker">}}).

## Standalone Envoy Binary

Instructions to install a standalone Envoy binary via your favorite package managers can be found [here]({{< relref "envoy">}}).

## Why Use CLI?

The `getenvoy` CLI simplifies installation, management and upgrades for each Envoy instance by codifying ongoing learnings and best practices for deploying and debugging Envoy. This allows you to benefit from the experiences of the wider Envoy community and get the most out of your investment in open source.

The CLI provides a streamlined Envoy experience by providing a single binary to download, run, and upgrade Envoy. And it reduces decision fatigue by applying sensible defaults that adhere to existing best practices, making it dramatically easier to distribute, deploy, and debug Envoy across multiple environments.  

Finally, it is the distribution mechanism for upcoming Envoy builds such as the Istio proxy and FIPs compliant flavors.
