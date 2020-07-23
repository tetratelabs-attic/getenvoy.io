+++
title = "Getting Started with Envoy HTTP Filter in Rust"
type = "tutorial"
tags = ["extension", "wasm", "rust", "http-filter"]
categories = []
orderweight = 0
abstract = "Develop you first Envoy extension (HTTP Filter) using GetEnvoy and Rust."
toc = true
+++

Let's create an _Envoy_ `HTTP Filter` in `Rust` using [`GetEnvoy Extension Toolkit`].

### 1. Pre-requirements

1. 💻 Install [GetEnvoy][`Install GetEnvoy`].

    ✅ check:

    ```shell
    $ getenvoy --version
    
    getenvoy version 0.2.0
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
    --language rust \
    --name me.filters.http.my_http_filter \
    my_http_filter
```

✅ `getenvoy` will scaffold a new _extension workspace_ in the target directory:

```shell
$ tree -a my_http_filter
 
my_http_filter
├── .cargo
│   └── config
├── .getenvoy
│   └── extension
│       └── extension.yaml
├── .gitignore
├── Cargo.toml
├── README.md
├── src
│   ├── config.rs
│   ├── factory.rs
│   ├── filter.rs
│   ├── lib.rs
│   └── stats.rs
└── wasm
    └── module
        ├── Cargo.toml
        └── src
            └── lib.rs
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 3. Build the extension

💻 To build a _WebAssembly_ module (_*.wasm file_) loadable by _Envoy_, run:

```shell
$ getenvoy extension build
```

✅ `getenvoy` will run `cargo build` to generate a _WebAssembly_ module (`extension.wasm`):

```shell
$ tree target/getenvoy

target/getenvoy
└── extension.wasm
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 4. Run unit tests

💻 To execute `Rust` unit tests, run:

```shell
$ getenvoy extension test
```

✅ `getenvoy` will run `cargo test`:

```
running 1 test
test tests::should_initialize ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 5. Run the extension in Envoy (the "hard" way)

💡 To get a better understanding of what actions must take place in order to run the extension, let's manually reproduce steps of `getenvoy`:

1. 💻 First, we need to build a _WebAssembly_ module (_*.wasm file_) that will be loaded by _Envoy_:

     ```shell
     $ getenvoy extension build
     ```
   ✅ `getenvoy` will run `cargo build` to generate a _WebAssembly_ module (`extension.wasm`):

     ```shell
     $ tree target/getenvoy
     
     target/getenvoy
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
         version: wasm:nightly
     ```

4. 💻 Next, we need to download `Envoy` binary of that version:

     ```shell
     $ getenvoy fetch wasm:nightly
     ```
   ✅ `getenvoy` will download `Envoy` binary and cache it under `$HOME/.getenvoy`:

     ```shell
     $ tree $HOME/.getenvoy/builds
     
     $HOME/.getenvoy/builds
     └── wasm
         └── nightly
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
   info	Envoy command: [$HOME/.getenvoy/builds/wasm/nightly/darwin/bin/envoy -c /tmp/getenvoy_extension_run732371719/envoy.tmpl. yaml]
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
info	Envoy command: [$HOME/.getenvoy/builds/wasm/nightly/darwin/bin/envoy -c /tmp/getenvoy_extension_run732371719/envoy.tmpl.yaml]
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
my_http_filter: #2 new http exchange starts at 2020-07-01T18:22:51.623813+00:00 with config:
my_http_filter: #2 observing request headers
my_http_filter: #2 -> :authority: 0.0.0.0:10000
my_http_filter: #2 -> :path: /
my_http_filter: #2 -> :method: GET
my_http_filter: #2 -> user-agent: curl/7.64.1
my_http_filter: #2 -> accept: */*
my_http_filter: #2 -> x-forwarded-proto: http
my_http_filter: #2 -> x-request-id: 8902ca62-75a7-40e7-9b2e-cd7dc983b091
my_http_filter: #2 http exchange complete
```

📚For more details see the [Extension Toolkit Walkthrough][`GetEnvoy Extension Toolkit: Walkthrough`].

### 7. Add a new feature

💡 To get familiar with the source code, refer to [Extension Toolkit Reference][`GetEnvoy Extension Toolkit: Get familiar with the source code`].

💡 Let’s add a new feature to the extension - inject an extra header into proxied HTTP responses.

1. 💻 First, let’s update extension config to hold the name of a header to inject (added lines are marked with `// added code`):

    **src/config.rs**
    ```rust
    /// Configuration for a Sample HTTP Filter.
    #[derive(Debug, Default, Deserialize)]
    pub struct SampleHttpFilterConfig {
       #[serde(default)]                 // added code
       pub response_header_name: String, // added code
    }
    ```

2. 💻 Next, let’s add `on_response_headers` method to the `SampleHttpFilter` (all lines need to be added):

    **src/filter.rs**
    ```rust
    /// Called when HTTP response headers have been received.
    ///
    /// Use filter_ops to access and mutate response headers.
    fn on_response_headers(
        &mut self,
        _num_headers: usize,
        filter_ops: &dyn http::ResponseHeadersOps,
    ) -> Result<http::FilterHeadersStatus> {
        if self.config.response_header_name != "" {
            filter_ops.add_response_header(&self.config.response_header_name, "injected by WebAssembly extension")?;
        }
        Ok(http::FilterHeadersStatus::Continue)
    }
    ```

3. 💻 Finally, let’s update extension configuration in the `default` _example setup_ (all lines need to be added):

    **.getenvoy/extension/examples/default/extension.json**
    ```json
    {
     "response_header_name": "my-header"
    }
    ```
4. 💻 To verify the changes, run:
    ```shell
    $ getenvoy extension run
    ```
    Then, in a separate shell, run:
    ```shell
    $ curl -i localhost:10000
    ```
    ✅ you should receive a response similar to: 
    ```
    HTTP/1.1 200 OK
    content-length: 22
    content-type: text/plain
    date: Tue, 07 Jul 2020 18:36:23 GMT
    server: envoy
    x-envoy-upstream-service-time: 0
    my-header: injected by WebAssembly extension
     
    Hi from mock service!
    ```
    🎉 Notice `my-header: injected by WebAssembly extension` that was injected by the `HTTP Filter` extension.

### 8. Add a new metric

💡 To get familiar with the source code, refer to [Extension Toolkit Reference][`GetEnvoy Extension Toolkit: Get familiar with the source code`].

💡 Let’s update the extension to expose metrics about its new behaviour.

Specifically, let’s provide a counter with a number of HTTP responses the extra header has been injected to.

1. 💻 First, let’s add a new _counter_ to the `Extension Stats` (added lines are marked with `// added code`):

    **src/stats.rs**
    ```rust
    // Sample stats.
    pub struct SampleHttpFilterStats {
       requests_total: Box<dyn Counter>,
       responses_injected_total: Box<dyn Counter>,              // added code
    }
     
    impl SampleHttpFilterStats {
       pub fn new(
           requests_total: Box<dyn Counter>,
           responses_injected_total: Box<dyn Counter>,          // added code
       ) -> Self {
           SampleHttpFilterStats {
               requests_total,
               responses_injected_total,                        // added code
           }
       }
       pub fn responses_injected_total(&self) -> &dyn Counter { // added code
           &*self.responses_injected_total                      // added code
       }                                                        // added code
    }
    ```
2. 💻 Next, let’s create the _counter_ at a time when `Extension Factory` is created (added lines are marked with `// added code`):

    **src/factory.rs**
    ```rust
    /// Creates a new factory.
    pub fn new(clock: &'a dyn Clock, stats: &dyn Stats) -> Result<Self> {
        let stats = SampleHttpFilterStats::new(
            stats.counter("examples.http_filter.requests_total")?,
            stats.counter("examples.http_filter.responses_injected_total")?, // added code
        );
        // Inject dependencies on Envoy host APIs
        Ok(SampleHttpFilterFactory {
            config: Rc::new(SampleHttpFilterConfig::default()),
            stats: Rc::new(stats),
            clock,
        })
    }
    ```
3. 💻 Finally, let’s increase the _counter_ in the `on_response_headers` method of the `SampleHttpFilter` (added lines are marked with `// added code`):

    **src/filter.rs**
    ```rust
    /// Called when HTTP response headers have been received.
    ///
    /// Use filter_ops to access and mutate response headers.
    fn on_response_headers(
        &mut self,
        _num_headers: usize,
        filter_ops: &dyn http::ResponseHeadersOps,
    ) -> Result<http::FilterHeadersStatus> {
        if self.config.response_header_name != "" {
            filter_ops.add_response_header(&self.config.response_header_name, "injected by WebAssembly extension")?;
            self.stats.responses_injected_total().inc()?;         // added code
        }
        Ok(http::FilterHeadersStatus::Continue)
    }
    ```
4. 💻 To verify the changes, run:
    ```shell
    $ getenvoy extension run
    ```
    Then, in a separate shell, run:
    ```shell
    $ curl -i localhost:10000
    $ curl -i localhost:10000

    $ curl -s localhost:9901/stats | grep responses_injected_total
    ```
    ✅ you should get the output similar to:
    ```
    examples.http_filter.responses_injected_total: 2
    ```
    🎉 Our new _counter_ gets incremented on every proxied HTTP request.

That concludes a brief look into _Envoy_ extension development using [`GetEnvoy Extension Toolkit`].

### 9. What's next

💡 Use the following resources to find more about [`GetEnvoy Extension Toolkit`]:

* [Extension Toolkit Reference][`GetEnvoy Extension Toolkit`]
* [getenvoy CLI Reference][`getenvoy CLI`]


[`GetEnvoy Extension Toolkit`]: /reference/getenvoy_extension_toolkit_reference/
[`getenvoy CLI`]: /reference/getenvoy_extension/

[`GetEnvoy Extension Toolkit: Walkthrough`]: /reference/getenvoy_extension_toolkit_reference/#walkthrough
[`GetEnvoy Extension Toolkit: Get familiar with the source code`]: /reference/getenvoy_extension_toolkit_reference/#7-get-familiar-with-the-source-code

[`Install GetEnvoy`]: /install/cli/binary
[`Install Docker`]: https://docs.docker.com/engine/install/
