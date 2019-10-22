+++
title = "Introducing the getenvoy CLI"
abstract = "A CLI to simplify Envoy installation, management, debugging and upgrades."
date = 2019-09-10
authors = ["Liam White", "Zack Butcher", "Thea Aldrich"]
tags = []
categories = []
+++

At Tetrate we’re are on a mission to improve the experience of developers deploying a service mesh in their organization. Whether it’s through the tools we create, providing training and support to users, or contributing to upstream open source projects, we’re committed to being trusted partners and facilitators of successful adoption of a service mesh. A major part of that commitment is reflected in the work our team has put in to simplify the process of building, deploying and maintaining a fleet of Envoy instances through [GetEnvoy](https://www.getenvoy.io).

Today we are excited to introduce the GetEnvoy CLI, or just `getenvoy` for short. `getenvoy` simplifies installation, management and upgrades for each Envoy instance by removing the need to copy multiple files and scripts to multiple servers, set the correct environment variables and run the scripts - all before even running Envoy. It gives a streamlined experience by providing a single binary to download, run, and upgrade Envoy. It reduces decision fatigue by applying sensible defaults that adhere to existing best practices, making it dramatically easier to distribute, deploy, and debug Envoy across multiple environments. `getenvoy` codifies ongoing learnings and best practices for deploying and debugging Envoy such as automatic collection of state on termination. This allows you to benefit from the experiences of the wider Envoy community and get the most out of your investment in open source. Finally, `getenvoy` will be the distribution mechanism for upcoming Envoy builds such as the Istio proxy and FIPs compliant flavors.

Getting Envoy running on most machines is as easy as:

```sh
$ curl -L https://getenvoy.io/cli | bash -s -- -b /usr/local/bin
$ getenvoy run standard:1.11.1
```

In addition to adding an FIPs compliant Envoy, we’re currently expanding GetEnvoy to include:

- The ability to collect a snapshot of live Envoy and VM/container state
- Automatically Configure traffic interception on a host
- Istio sidecar support
- Support for deploying Envoys managed by App Mesh and Traffic Director
- Readiness and liveness endpoints 

Get Started with the `getenvoy` CLI [here](/install/). To learn more about Envoy or to contribute to the Envoy Proxy Project please visit [https://www.envoyproxy.io/](https://www.envoyproxy.io/).
