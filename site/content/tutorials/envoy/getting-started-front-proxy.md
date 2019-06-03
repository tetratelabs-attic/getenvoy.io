+++
title = "Getting Started with Envoy as a Basic Front Proxy"
tags = []
categories = []
+++

In this tutorial we are going to use Envoy as a basic front proxy to Google and Bing. When we hit Envoy with the path `/google` it will proxy our request to `www.google.com` and when we hit Envoy with the path `/bing` it will proxy our request to `www.bing.com`.

<!-- TODO: Insert diagram illustrating the above here -->

1. **Retrieve static configuration for Envoy to use.**
```sh
$ curl {{ "/samples/basic-front-proxy.yaml" | absURL }}
```

1. **Investigate the static configuration file.**
```sh
$ cat front-proxy.yaml
static_resources:
...
```
In this static configuration there is one listener, listening on `0.0.0.0:15000`. All requests sent to this listener are matched based on their path in order to select the correct route. In this case, we have two routes: one for Google (`prefix: "/google"`) and the other for Bing (`prefix: "/bing"`). If the request matches one of these conditions it is then forwarded onto the relevant cluster. Once Envoy has selected which cluster to send the request to based on the path match it has enough information to know where the request needs to be proxied.


1. **Run Envoy using the static configuration.**
```sh
$ envoy --config-path ./front-proxy.yaml
```

1. **Open a new shell and cURL Envoy with `/google`.**
```sh
$ curl -s -o /dev/null -vvv localhost:15000/google
...
Connected to localhost (127.0.0.1) port 15000 (#0)
> GET /google HTTP/1.1
> Host: localhost:15000
...
< HTTP/1.1 200 OK
< date: Mon, 03 Jun 2019 08:43:43 GMT
< server: envoy
< set-cookie: 1P_JAR=2019-06-03-08; expires=Wed, 03-Jul-2019 08:43:44 GMT; path=/; domain=.google.com
...
{ [695 bytes data]
```
Here you can see that we made it to google.com as it is setting a cookie. If you want to see the full `HTTP` response body remove the `-s -o /dev/null` flags.

1. **cURL Envoy with `/bing`.**
```sh
$ curl -s -o /dev/null -vvv localhost:15000/bing
...
Connected to localhost (127.0.0.1) port 15000 (#0)
> GET /bing HTTP/1.1
> Host: localhost:15000
...
< HTTP/1.1 200 OK
< date: Mon, 03 Jun 2019 08:51:33 GMT
< server: envoy
< set-cookie: SRCHD=AF=NOFORM; domain=.bing.com; expires=Sat, 27-Jun-2020 08:51:34 GMT; path=/
...
{ [2151 bytes data]
```
Here you can see that we made it to bing.com as it is also setting a cookie. If you want to see the full `HTTP` response body remove the `-s -o /dev/null` flags.

1. **Check the access logs in the shell running Envoy.**
```sh
[2019-06-03T08:43:44.088Z] "GET /google HTTP/1.1" 200 - 0 11381 71 64 "-" "curl/7.54.0" "ecb0f8fe-1fc5-4c95-ac87-2e828b5ccdde" "www.google.com" "216.58.211.164:80"
[2019-06-03T08:51:34.262Z] "GET /bing HTTP/1.1" 200 - 0 111099 368 134 "-" "curl/7.54.0" "f52bfe01-ab0d-438f-9e4b-2ccba33634e9" "www.bing.com" "204.79.197.200:80"
```
The access logs confirm that we have made two successful requests: one to `www.google.com` and the other to `www.bing.com`. To find out more about the default format and information on the other fields present, check out the Envoy [documentation](https://www.envoyproxy.io/docs/envoy/latest/configuration/access_log#default-format-string).
