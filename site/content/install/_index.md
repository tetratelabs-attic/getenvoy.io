+++
title = "Installation"
type = "install"
layout = "install"
toc = true
+++

GetEnvoy CLI allows you to quickly see available versions of Envoy and try them out. This makes it easy to validate
configuration you would use in production. Each time you end a `getenvoy run`, a snapshot of runtime state is taken on
your behalf. This makes knowledge sharing and troubleshooting easier, especially when upgrading. Try it out!

Installing and running `getenvoy` on Linux and macOS is as easy as:

```sh
$ curl -L https://getenvoy.io/install.sh | bash -s -- -b /usr/local/bin
$ getenvoy run -c /path/to/envoy.yaml
# If you don't have a configuration file, you can start the admin port like this
$ getenvoy run --config-yaml "admin: {access_log_path: '/dev/stdout', address: {socket_address: {address: '127.0.0.1', port_value: 0}}}"
```

The CLI is also available via [Homebrew]({{< relref "cli/homebrew">}}).

## Standalone Envoy Binary

If you want to use normal package managers to install Envoy, look [here]({{< relref "envoy">}}).

