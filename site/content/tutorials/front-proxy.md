+++
title = "Using Envoy as a Basic Front Proxy"
type = "tutorial"
tags = []
categories = []
orderweight = 0
abstract = "In this tutorial we use Envoy as a basic front proxy to Google and Bing."
toc = true
+++

## Requirements ##

An installation of Envoy. You can find instructions on how to install Envoy [here](https://www.getenvoy.io/platforms/).

## Instructions ##

In this tutorial we are going to use Envoy as a basic front proxy to Google and Bing. When we hit Envoy with the host header `google.com` it will proxy our request to `www.google.com` and when we hit Envoy with the host header `bing.com` it will proxy our request to `www.bing.com`.

1. **Retrieve static configuration for Envoy to use.**
```sh
$ curl -L https://getenvoy.io/samples/basic-front-proxy.yaml > basic-front-proxy.yaml
```

1. **Investigate the static configuration file.**
```sh
$ cat basic-front-proxy.yaml
```
The YAML contains comments explaining the behavior of the relevant sections.


1. **Run Envoy using the static configuration.**
```sh
$ envoy --config-path ./basic-front-proxy.yaml
```

1. **Open a new shell and cURL Envoy with `google.com` as the host header.**
```sh
$ curl -s -o /dev/null -vvv -H 'Host: google.com' localhost:15000/
```
```sh-output
Connected to localhost (127.0.0.1) port 15000 (#0)
> GET / HTTP/1.1
> Host: google.com
> User-Agent: curl/7.54.0
>
< HTTP/1.1 200 OK
< server: envoy
< set-cookie: 1P_JAR=2019-06-05-08; expires=Fri, 05-Jul-2019 08:30:07 GMT; path=/; domain=.google.com
{ [3538 bytes data]
```
In this abbreviated response you can see that we made it to google.com as it is setting a cookie. If you want to see the full `HTTP` response body remove the `-s -o /dev/null` flags.

1. **cURL Envoy with `bing.com` as the host header.**
```sh
$ curl -s -o /dev/null -vvv -H 'Host: bing.com' localhost:15000/
```
```sh-output
...
Connected to localhost (127.0.0.1) port 15000 (#0)
> GET / HTTP/1.1
> Host: bing.com
> User-Agent: curl/7.54.0
>
< HTTP/1.1 200 OK
< server: envoy
< set-cookie: SRCHD=AF=NOFORM; domain=.bing.com; expires=Mon, 29-Jun-2020 08:30:01 GMT; path=/
<
{ [279 bytes data]
```
In this abbreviated response you can see that we made it to bing.com as it is also setting a cookie. If you want to see the full `HTTP` response body remove the `-s -o /dev/null` flags.

1. **Check the access logs in the shell running Envoy.**
```sh-output
[2019-06-05T08:30:01.145Z] "GET / HTTP/1.1" 200 - 0 111162 374 135 "-" "curl/7.54.0" "c1aeafd2-dcd9-4070-80fd-f8f4f6bd1e85" "www.bing.com" "13.107.21.200:80"
[2019-06-05T08:30:07.799Z] "GET / HTTP/1.1" 200 - 0 12426 64 60 "-" "curl/7.54.0" "0c8ce45d-e99e-4ddc-9cc4-06d75d81e610" "www.google.com" "216.58.213.4:80"
```
The access logs confirm that we have made two successful requests: one to `www.google.com` and the other to `www.bing.com`. To find out more about the default format of the access logs and information on the other fields present, check out the Envoy [documentation](https://www.envoyproxy.io/docs/envoy/latest/configuration/access_log#default-format-string).
