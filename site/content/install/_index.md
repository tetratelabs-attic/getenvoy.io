+++
title = "Installation"
type = "install"
layout = "install"
toc = true
+++

func-e allows you to quickly see available versions of Envoy and try them out. This makes it easy to validate
configuration you would use in production. Each time you end a `func-e run`, a snapshot of runtime state is taken on
your behalf. This makes knowledge sharing and troubleshooting easier, especially when upgrading. Try it out!

Installing and running `func-e` on Linux and macOS is as easy as:

```sh
$ curl -L https://getenvoy.io/install.sh | bash -s -- -b /usr/local/bin
$ func-e run -c /path/to/envoy.yaml
# If you don't have a configuration file, you can start the admin port like this
$ func-e run --config-yaml "admin: {address: {socket_address: {address: '127.0.0.1', port_value: 9901}}}"
```
