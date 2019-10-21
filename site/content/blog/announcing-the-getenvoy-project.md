+++
tags = []
categories = []
title = "Announcing the GetEnvoy Project"
abstract = "A collection of tooling to help simplify Envoy proxy adoption."
date = 2019-07-16
authors = ["Liam White", "Tevah Platt"]
toc = true
+++

## Why Envoy Proxy ##

If you’re running a large, distributed architecture, you’ve probably heard of Envoy, if not pored over its features for controlling, securing and monitoring a system with unwieldy, heterogeneous components. 
A quick walkthrough, if you haven’t: Originally built at Lyft, Envoy is an open source, edge and service proxy that abstracts the networking functionality away from applications, providing common, platform-agnostic features. Envoy proxies can be deployed beside your applications as a sidecar or run as an edge proxy. (For details, we recommend this [CNCF primer](https://www.cncf.io/project-faq/envoy/)).

The upshot: With all service traffic flowing through an Envoy mesh, it becomes possible to consistently control and observe what’s going on in your network. Envoy handles most network features-- service discovery, access logging, metrics monitoring, tracing, authentication and authorization-- configured via a control plane such as Istio, Google Traffic Director or AWS App Mesh. It pushes these concerns into the platform itself, so that developers can focus on the business logic of their applications, delivering services quickly and continuously using their choice of languages and technologies. 

It’s not surprising that, from its 2015 creation to its CNCF graduation last year, Envoy has been adopted by all the major cloud providers (e.g., Google, Microsoft, Amazon, Salesforce…) and hundreds of end users including Airbnb, Netflix and Uber.

## Easing Management of the Envoy Lifecycle ##

Where’s the rub? As with a lot of open source projects, there is a lack of consistent tooling. This makes it difficult to build, deploy and maintain a fleet of Envoy instances easily. The goal of the GetEnvoy project is to work with the Envoy community to address these lifecycle issues and make Envoy adoption easier. We’re working with end-users, vendors and cloud providers to build tooling that provides general solutions to Envoy lifecycle problems that can be leveraged by the wider community.

The most common and most painful issue we’ve heard repeatedly is that it’s difficult to build Envoy, so this is the first issue we’ve tackled. With GetEnvoy, Tetrate’s engineers, including key Envoy contributors and maintainers, users can leverage trusted, certified builds, distributed via the most popular package managers: `apt`, `yum` and `Homebrew`.

For those using containers, we provide a distro-less Docker image. This means users don’t have to worry about having an entire OS worth of unnecessary packages lying around, reducing image size and the surface area for any malicious attackers.

If you want to leverage our build pipeline and build Envoy yourself, we are in the process of open-sourcing our code. Check back later for updates on this.

## Current Features ##

In summary, these are the features currently available:

- Stable and nightly builds for `Ubuntu`, `Debian`, `CentOS` and `macOS`.
- Distribution via `apt`, `yum`, `Homebrew`, `DockerHub`.
- Stable and nightly distro-less Docker image.

So far, we have tackled some of the pre-zero-day issues. Expect more announcements soon regarding tooling for the day-zero+ difficulties with Envoy, including deploying and maintaining a fleet of Envoy instances.

## Get Started ##

To get started with GetEnvoy, use our instructions for [installing Envoy](/platforms). Once you’ve installed Envoy you can try out a [basic Envoy scenario](/tutorials/envoy/getting-started/front-proxy/) locally. If you want to try out our Envoy distributions on Google Traffic director, check out our [blog post](/blog/using-getenvoy-with-traffic-director/) on why and how to do so.

## Call To Action ##

Finally, we want to hear from you! If you have any feature requests, want support for a given operating system or are having issues building, deploying or maintaining your Envoy instances that you think we should address, please tell us [here](https://github.com/tetratelabs/getenvoy/issues/new/choose).
