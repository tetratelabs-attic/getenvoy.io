+++
title = "Getting Started with Envoy HTTP Filter in TinyGo"
type = "tutorial"
tags = ["extension", "wasm", "tinygo", "http-filter"]
categories = []
orderweight = 0
abstract = "Develop you first Envoy extension (HTTP Filter) using GetEnvoy and TinyGo."
toc = true
+++

[`TinyGo`] is a compiler of Go language specification, and it is widely used in small embedded places like WebAssembly.
In addition to Rust, [`GetEnvoy Extension Toolkit`] also supports [`Envoy SDK for TinyGo`] which enables you to develop Envoy extensions in Go. 

Let's create an _Envoy_ `HTTP Filter` in `TinyGo` using [`GetEnvoy Extension Toolkit`].

### 1. Pre-requirements

1. 💻 Install [GetEnvoy][`Install GetEnvoy`].

    ✅ check:

    ```shell
    $ getenvoy --version
    
    getenvoy version 0.2.1
    ```

2. 💻 Install [Docker][`Install Docker`].

    ✅ check:

    ```shell
    $ docker --version
    
    Docker version 19.03.8, build afacb8b
    ```

### 2. Scaffold a new _HTTP Filter_ extension

💻 To walk through the interactive wizard, run:

```shell
$ getenvoy extension init
```

💡 Alternatively, to skip the wizard, provide the arguments on the command line, e.g.:

```shell
$ getenvoy extension init \
    --category envoy.filters.http \
    --language tinygo \
    --name me.filters.http.my_http_filter \
    my_http_filter
```

✅ `getenvoy` will scaffold a new _extension workspace_ in the target directory:

```shell
$ my_http_filter
├── .getenvoy
│   └── extension
│       └── extension.yaml
├── .gitignore
├── go.mod
├── go.sum
├── main.go
└── main_test.go

2 directories, 6 files

```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 3. Build the extension

💻 To build a _WebAssembly_ module (_*.wasm file_) loadable by _Envoy_, run:

```shell
$ getenvoy extension build
```

✅ `getenvoy` will run `tinygo build` to generate a _WebAssembly_ module (`extension.wasm`):

```shell
$ tree build

build
└── extension.wasm
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 4. Run unit tests

💻 To execute `Go` unit tests, run:

```shell
$ getenvoy extension test
```

✅ `getenvoy` will run `go test`:

```
=== RUN   TestHttpFilter_OnHttpRequestHeaders
2021/03/18 00:37:35 proxy_info_log: observing request headers
2021/03/18 00:37:35 proxy_info_log: key1: value1
2021/03/18 00:37:35 proxy_info_log: key2: value2
2021/03/18 00:37:35 proxy_info_log: header set: additional=header
2021/03/18 00:37:35 proxy_info_log: header set: HELLO=WORLD
2021/03/18 00:37:35 proxy_info_log: header set: ENVOY=ISTIO
--- PASS: TestHttpFilter_OnHttpRequestHeaders (0.00s)
PASS
ok  	me.filters.http.my_http_filter	0.003s
```

Internally, this command leverages the SDK's [Test Framework][Go SDK Test Framework]. 
It allows you to write and run unittests with the official Go tool chain.

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 5. Run the extension in Envoy (the "hard" way)

💡 To get a better understanding of what actions must take place in order to run the extension, let's manually reproduce steps of `getenvoy`:

1. 💻 First, we need to build a _WebAssembly_ module (_*.wasm file_) that will be loaded by _Envoy_:

     ```shell
     $ getenvoy extension build
     ```
   ✅ `getenvoy` will run `cargo build` to generate a _WebAssembly_ module (`extension.wasm`):

     ```shell
     $ tree build
     build
     └── extension.wasm
     ```
2. 💻 Next, we need to prepare _Envoy_ config suitable for this particular extension:

     ```shell
     $ getenvoy extension examples add
     ```
   ✅ `getenvoy` will generate the `default` _example setup_:

     ```shell
     $ tree .getenvoy/extension/examples/
     
     .getenvoy/extension/examples/
     └── default
         ├── README.md
         ├── envoy.tmpl.yaml
         ├── example.yaml
         └── extension.json
     ```
3. 💻 Next, we need to find out what version of `Envoy` the extension is compatible with:

     ```shell
     $ cat .getenvoy/extension/extension.yaml
     ```
   ✅ `getenvoy` records the compatible version of `Envoy` at a time of `getenvoy extension init`:

     ```yaml
     # Runtime the extension is being developed against.
     runtime:
       envoy:
         version: standard:1.17.0
     ```

4. 💻 Next, we need to download `Envoy` binary of that version:

     ```shell
     $ getenvoy fetch standard:1.17.0
     ```
   ✅ `getenvoy` will download `Envoy` binary and cache it under `$HOME/.getenvoy`:

     ```shell
     $ tree $HOME/.getenvoy/builds
     
     $HOME/.getenvoy/builds
     └── standard
         └── 1.17.0
             └── darwin
                 └── bin
                     └── envoy
     ```
5. 💻 Finally, we need to wire together various configuration bits (such as, _Envoy_ config, _*.wasm file_,   
  extension-specific config) and start the _Envoy_ process:
   ```shell
   $ getenvoy extension run
   ```   
   ✅ `getenvoy` will generate the actual `Envoy` config (by resolving placeholders in the configuration template )
   and start the _Envoy_ process in the foreground:
   ```
   info	Envoy command: [$HOME/.getenvoy/builds/standard/1.17.0/darwin/bin/envoy -c /tmp/getenvoy_extension_run732371719/envoy.tmpl.yaml]
   ...
   [info][main] [external/envoy/source/server/server.cc:339] admin address: 127.0.0.1:9901
   ...
   [info][config] [external/envoy/source/server/listener_manager_impl.cc:700] all dependencies initialized. starting workers
   [info][main] [external/envoy/source/server/server.cc:575] starting main dispatch loop
   ```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 5+. Run the extension in _Envoy_ (the "easy" way)

💻 To run the extension in _Envoy_, execute:

```shell
$ getenvoy extension run
```

✅ `getenvoy` will download `Envoy` binary, generate a sample _Envoy_ config and start the _Envoy_ process in the foreground:

```
info	Envoy command: [$HOME/.getenvoy/builds/standard/1.17.0/darwin/bin/envoy -c /tmp/getenvoy_extension_run732371719/envoy.tmpl.yaml]
...
[info][main] [external/envoy/source/server/server.cc:339] admin address: 127.0.0.1:9901
...
[info][config] [external/envoy/source/server/listener_manager_impl.cc:700] all dependencies initialized. starting workers
[info][main] [external/envoy/source/server/server.cc:575] starting main dispatch loop
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 6. Make sample requests

💻 Checkout `README.md` file included in the `default` _example setup_:

   ```shell
   $ open .getenvoy/extension/examples/default/README.md
   ```

✅ In the case of a _HTTP Filter_, instructions will be similar to the following:
   ```markdown
   ## How to use
   
   1. Make HTTP request
      ```shell
      curl http://0.0.0.0:10000
      ```
   2. Checkout `Envoy` stdout
   ```

💻 Follow `How to use` instructions from `README.md`

✅ _HTTP Filter_ extension will log the following to the output of `Envoy` process:

```
wasm log: observing request headers
wasm log: :authority: 0.0.0.0:10000
wasm log: :path: /
wasm log: :method: GET
wasm log: user-agent: curl/7.64.1
wasm log: accept: */*
wasm log: x-forwarded-proto: http
wasm log: x-request-id: 8902ca62-75a7-40e7-9b2e-cd7dc983b091
wasm log: header set: additional=header
```

In the above, you see the log `header set: additional=header`. Actually the header is injected in your response:

```
HTTP/1.1 200 OK
content-length: 22
content-type: text/plain
date: Thu, 18 Mar 2021 00:58:02 GMT
server: envoy
x-envoy-upstream-service-time: 0
additional: header

Hi from mock service!
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

💡 To get familiar with the source code, refer to [the TinyGo SDK repository][`Envoy SDK for TinyGo`].

### 7. Set the plugin config to add more headers

💻 The scaffolded code is already written to read the configuration provided by Envoy at http filter startup time:

**main.go**
```go
func (ctx *rootContext) OnPluginStart(configurationSize int) types.OnPluginStartStatus {
...
     // Read plugin configuration provided in Envoy configuration.
    data, err := proxywasm.GetPluginConfiguration(configurationSize)
 
...
    // Each line in the configuration is in the "KEY=VALUE" format.
    scanner := bufio.NewScanner(bytes.NewReader(data))
    for scanner.Scan() {
        tokens := strings.Split(scanner.Text(), "=")
        ctx.additionalHeaders[tokens[0]] = tokens[1]
    }
    return types.OnPluginStartStatusOK
}
```

As you can see, the configuration is parsed line by line  in `KEY=VALUE` format, 
and the key-value pairs are added to `ctx.additionalHeaders`.

`ctx.additionalHeaders` are eventually added to http response headers in 

**main.go**
```go
// Override proxywasm.DefaultHttpContext
func (ctx *httpContext) OnHttpResponseHeaders(numHeaders int, endOfStream bool) types.Action {
    // Set additional headers in the response.
    for key, value := range ctx.additionalHeaders {
        if err := proxywasm.SetHttpResponseHeader(key, value); err != nil { ... }
    }
    return types.ActionContinue
}
```


1. 💡 Let’s set a configuration to add more original response headers!

   **.getenvoy/extension/examples/default/extension.json**
   ```
   another=header
   hello=world
   ```

2. 🎉 Now you can see the new headers in the http response:

   ```
   $ curl -i localhost:10000 --head
   HTTP/1.1 200 OK
   content-length: 22
   content-type: text/plain
   date: Thu, 18 Mar 2021 03:30:29 GMT
   server: envoy
   x-envoy-upstream-service-time: 0
   additional: header
   another: header
   hello: world
   ```

### 8. Implement a simple authentication

💻 In TinyGo SDK, you can use `GetRequestHeader(key string)` function to get a header value for a given `key`.
💡 Let's add a simple authentication feature in your http filter by validating the request header value. 

1. 💻 First, rewrite the `OnHttpRequestHeaders` which handles http request headers and get the header value to `my-auth-key`:
   **main.go**
    ```go
    func (ctx *httpContext) OnHttpRequestHeaders(numHeaders int, endOfStream bool) types.Action {
        myAuthValue, _ := proxywasm.GetHttpRequestHeader("my-auth-key").
        // TODO: add authentication based on myAuthValue
        return types.ActionContinue
    }
    ```
   Here, `GetHttpRequestHeader("my-auth-key")` is used to get the header value corresponding to `my-auth-key`.
   The second return value is of error type, and ignore it just for simplicity here.

2. 💻 Next, let’s add authentication based on `myAuthValue`:
   **main.go**
    ```go
    func (ctx *httpContext) OnHttpRequestHeaders(numHeaders int, endOfStream bool) types.Action {
        myAuthValue, _ := proxywasm.GetHttpRequestHeader("my-auth-key")
        if myAuthValue != "my-private-key" {
            proxywasm.SendHttpResponse(403, nil, "")
            return types.ActionPause
        }
        return types.ActionContinue
    }
    ```
   First we check whether `myAuthValue` equals `my-private-key`. 
   As you see, if the value equals, then the request process continues with `types.ActionContinue`. 
   Otherwise, we call `proxywasm.SendHttpResponse(403, nil, "")` to reject the request by sending a http response from your http filter.
   Here, the first argument `403` means we send the response with 403 status code, 
   and the second and third argument corresponds to response headers and body respectively.

4. 💻 To verify the changes, run:
    ```shell
    $ getenvoy extension run
    ```
    Then, in a separate shell, run:
    ```
    $ curl -i localhost:10000 -H "my-auth-key: bad-key"
    HTTP/1.1 403 Forbidden
    additional: header
    another: header
    hello: world
    date: Thu, 18 Mar 2021 07:59:57 GMT
    server: envoy
    content-length: 0
    ```
    🎉You see that your request is rejected and get `403 Forbidden` in your terminal as we expect!

    ✅ Also your request should be accepted with `my-private-key` header: 
    ```
    $ curl -i localhost:10000 -H "my-auth-key: my-private-key"
    HTTP/1.1 200 OK
    content-length: 22
    content-type: text/plain
    date: Thu, 18 Mar 2021 08:02:32 GMT
    server: envoy
    x-envoy-upstream-service-time: 0
    additional: header
    another: header
    hello: world
    
    Hi from mock service!
    ```
    Now you have a simple authentication logic written in Go! Awesome, isn't it?😉
      
### 8. What's next

💡 Use the following resources to find more about [`GetEnvoy Extension Toolkit`]:

* [Extension Toolkit Reference][`GetEnvoy Extension Toolkit`]
* [getenvoy CLI Reference][`getenvoy CLI`]
* [Envoy SDK for TinyGo][`Envoy SDK for TinyGo`]

[`GetEnvoy Extension Toolkit`]: /reference/getenvoy_extension_toolkit_reference/
[`getenvoy CLI`]: /reference/getenvoy_extension/

[`GetEnvoy Extension Toolkit: Walkthrough`]: /reference/getenvoy_extension_toolkit_reference/#walkthrough

[`Envoy SDK for TinyGo`]: https://github.com/tetratelabs/proxy-wasm-go-sdk/tree/v0.1.0
[Go SDK Test Framework]: https://github.com/tetratelabs/proxy-wasm-go-sdk/tree/v0.1.0/proxytest
[`TinyGo`]: https://tinygo.org/

[`Install GetEnvoy`]: /install/cli/binary
[`Install Docker`]: https://docs.docker.com/engine/install/
