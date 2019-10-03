+++
title = "CLI vs Binary"
type = "faq"
+++

At Tetrate we’re are on a mission to improve the experience of developers deploying a service mesh in their organization. Whether it’s through the tools we create, providing training and support to users, or contributing to upstream open source projects, we’re committed to being trusted partners and facilitators of successful adoption of a service mesh. A major part of that commitment is reflected in the work our team has put in to simplify the process of building, deploying and maintaining a fleet of Envoy instances through [GetEnvoy](https://www.getenvoy.io).

Today we are excited to introduce the GetEnvoy CLI, or just `getenvoy` for short. `getenvoy` simplifies installation, management and upgrades for each Envoy instance by removing the need to copy multiple files and scripts to multiple servers, set the correct environment variables and run the scripts - all before even running Envoy. It gives a streamlined experience by providing a single binary to download, run, and upgrade Envoy. This reduces decision fatigue by applying sensible defaults that adhere to existing best practices, making it dramatically easier to distribute, deploy, and debug Envoy across multiple environments. `getenvoy` also codifies ongoing learnings and best practices for deploying and debugging Envoy. This allows you to benefit from the experiences of the wider Envoy community and get the most out of your investment in open source.

## CLI Installation

GetEnvoy offers a standard upstream Envoy distributed via standard package managers. You can learn more about how to Get Started with GetEnvoy and the `getenvoy` CLI [here](https://www.getenvoy.io/platforms/). In addition to adding an FIPs compliant Envoy, we’re currently expanding GetEnvoy to include:
-The ability to collect a snapshot of live Envoy and VM/container state
-Configure traffic interception on a host
-Istio sidecar support
-Support for deploying Envoys managed by App Mesh and Traffic Director
-Readiness and liveness endpoints

To try GetEnvoy and the GetEnvoy CLI tool please visit [GetEnvoy.io](https://www.getenvoy.io/). To learn more about Envoy or to contribute to the Envoy Proxy Project please visit [https://www.envoyproxy.io/](https://www.envoyproxy.io/)

## Binary Installation

We also provide you with ready to use binary specific for your platform. Take a look below to see installation detail for your platform of choice
