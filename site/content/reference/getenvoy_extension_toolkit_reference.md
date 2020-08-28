+++
title = "Extension Toolkit Reference"
type = "reference"
parent = "root"
command = "Extension Toolkit"
+++
## Extension Toolkit Reference

## Introduction

The purpose of `GetEnvoy Extension Toolkit` is to help developers curious about the extensibility of _Envoy_
to get up and running in seconds.

By using _GetEnvoy Extension Toolkit_, you:

* will be able to _start from_ a working and representative example;
* will have _effective development workflow_ set up from the beginning;
* will _leverage best practices_ and _avoid common pitfalls_ by default.

## Supported extension types and languages

Supported _extension types_:

* `HTTP Filter`
* `Network Filter`
* `Access Logger`

Supported _languages_:

* `Rust`

## Development Flow

`getenvoy` CLI provides a group of commands that automate a familiar development flow:

<center>`init` => `build` => `test` => `run`</center>

| Step    | Role                                                     |
| ------- | -------------------------------------------------------- |
| `init`  | scaffold a new extension                                 |
| `build` | build a _WebAssembly_ module (_*.wasm file_)             |
| `test`  | run language-specific unit tests                         |
| `run`   | launch the extension in _Envoy_ using an _example setup_ |

## Walkthrough

Let’s walk through the development flow of a _WebAssembly_-based _Envoy_ extension using the _GetEnvoy Extension Toolkit_.

### 1. Pre-requirements

1. 💻 Install [GetEnvoy][`Install GetEnvoy`].

     💡 `getenvoy` CLI will keep its internal files (such as caches and downloaded artifacts) at `$HOME/.getenvoy`.

2. 💻 Install [Docker][`Install Docker`].

     💡 `getenvoy` CLI uses `Docker` to run language-specific build tools inside containers, e.g. `Cargo` (_Rust_).


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

📚For further details and usage examples refer to the documentation of [`getenvoy extension init`].

#### Generated files

💡 At a high level, _extension workspace_ consists of 2 groups of files:

1. programming language-specific source code, e.g. `Rust` sources, `Cargo` config, etc
2. _GetEnvoy Extension Toolkit_-specific metadata, i.e. all files under `.getenvoy/extension/`

##### Source code

💡 `Rust` version of init templates is based on [`Envoy SDK for Rust`],
which gives _WebAssembly_-based extensions a model similar to their native counterparts,
including concepts such as `Extension`, `Extension Factory`, `Extension Config`, `Extension Stats`,
etc.

##### Metadata files

💡 Metadata files, such as `.getenvoy/extension/extension.yaml`, drive behaviour of various `getenvoy` commands.

Metadata files can be edited manually and should be kept under source control along with the extension source code.

### 3. Build the extension

💻 To build a _WebAssembly_ module (_*.wasm file_) loadable by _Envoy_, run:

```shell
$ getenvoy extension build
```

✅ `getenvoy` will internally run a language-specific build tool to generate a _WebAssembly_ module (`extension.wasm`):

```shell
$ tree target/getenvoy

target/getenvoy
└── extension.wasm
```

💡 To support multiple programming languages and be able to work in arbitrary user environments,
`getenvoy` commands by default leverage `Docker` containers to run language-specific tools.

E.g., in the case of `Rust`, `getenvoy` uses [`docker.io/getenvoy/extension-rust-builder`] image to run `cargo build` command.

💡 If your extension requires a non-standard build image or extra container options, you can override the defaults
 either temporarily (via command line options) or permanently (via a respective metadata file).

✅ on first use of the `build` command, `getenvoy` will generate a _toolchain_ metadata file to let you override the default build behaviour:

```shell
$ tree .getenvoy/extension/toolchains

.getenvoy/extension/toolchains
└── default.yaml
``` 

📚For further details and usage examples refer to the documentation of [`getenvoy extension build`].

### 4. Run unit tests

💻 To execute programming language-specific unit tests, run:

```shell
$ getenvoy extension test
```

✅ `getenvoy` will pipe output of the language-specific test framework:

```
running 1 test
test tests::should_initialize ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

💡 As mentioned earlier, `getenvoy` by default leverages `Docker` containers to run unit tests.

E.g., in the case of `Rust`, `getenvoy` uses [`docker.io/getenvoy/extension-rust-builder`] image to run `cargo test` command.

📚For further details and usage examples refer to the documentation of [`getenvoy extension test`].

### 5. Run the extension in _Envoy_ (the "easy" way)

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

📚For further details and usage examples refer to the documentation of [`getenvoy extension run`].

### 5+. Run the extension in _Envoy_ (the "hard" way)

💡 To get a better understanding of what `getenvoy extension run` does, we can also reproduce its steps manually:

1. 💻 First, we need to build a _WebAssembly_ module (_*.wasm file_) that will be loaded by _Envoy_:

     ```shell
     $ getenvoy extension build
     ```
   ✅ `getenvoy` will internally run a language-specific build tool to generate a _WebAssembly_ module (`extension.wasm`):

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
         version: wasm:1.15
     ```
   ⚠️  Since _WebAssembly_ support in `Envoy` is still under active development, no assumptions can be made about
   [API][`Envoy ABI`] compatibility between various _Envoy_ releases.

4. 💻 Next, we need to download `Envoy` binary of that version:

     ```shell
     $ getenvoy fetch wasm:1.15
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

### 6. Make sample requests

💡 Every _example setup_ comes with instructions on how to use it.

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

### 7. Get familiar with the source code

💡 As mentioned earlier, `Rust` version of init templates is based on [`Envoy SDK for Rust`],
which gives _WebAssembly_-based extensions a model similar to their native counterparts,
including concepts such as `Extension`, `Extension Factory`, `Extension Config`, `Extension Stats`,
etc.

Let’s take a closer look into the source code of a _HTTP Filter_ extension.

| File                     | Role                                                                    |
| ------------------------ | ----------------------------------------------------------------------- |
| `Cargo.toml`             | `Rust` package with the source code of `HTTP Filter` extension.         |
| `src/config.rs`          | Types that represent extension’s configuration.                         |
| `src/factory.rs`         | Types that represent extension’s `Factory`.                             |
| `src/filter.rs`          | Types that represent extension itself (`HTTP Filter`).                  |
| `src/lib.rs`             | `Rust` library.                                                         |
| `src/stats.rs`           | Types that represent metrics collected by the extension.                |
| `wasm/module/Cargo.toml` | `Rust` package representing a _WebAssembly_ module that bundles one or more extensions together. |
| `wasm/module/src/lib.rs` | Entrypoint of a _WebAssembly_ module (`_start` function).               |

#### Lifecycle of the _WebAssembly_ module

* _Envoy_ extensions get distributed as _WebAssembly_ modules (_*.wasm files_).
* A single _WebAssembly_ module can include multiple extensions bundled together.
* _Envoy_ starts _loading_ a _WebAssembly_ module as soon as it receives a `Listener` configuration that refers to that module.
* Once a module is loaded into memory, _Envoy_ will call the `_start` function to let the module initialize itself,
  which typically includes initializing static variables, configuring logging, registering extensions provided by the module, etc.
* _Envoy_ will _unload_ the _WebAssembly_ module as soon as the `Listener` that refered to it has been removed.

#### Lifecycle of the _Extension Factory_

* `Extension Factory` gets created once, when `Envoy` is applying a new `Listener` configuration
* After that, `Envoy` will call `Extension Factory` to pass it extension-specific configuration
* `Extension Factory` can parse configuration (typically in `JSON` format) and initilize state that will be shared
  by all `Extension` instances

#### Lifecycle of the _HTTP Filter_

* `HTTP Filter` in `Envoy` is a stateful object that is only processing a single HTTP request
* Once _Envoy_ receives a new HTTP request, it will call the `Extension Factory` to create a new `HTTP Filter` instance
* Next, _Envoy_ will start calling lifecycle callbacks defined on that `HTTP Filter`, e.g.
  * `on request headers`
  * `on request body chunk`
  * `on response headers`
  * `on exchange complete`
  * etc
* Within the context of lifecycle callbacks, `HTTP Filter` can do the following:
  * _suspend_/_resume_ further processing of that HTTP request
  * _mutate_ headers/body/trailers of HTTP request and response 
  * make _auxiliary HTTP requests_
  * record _metrics_
  * record extra data for inclusion into _Access Log_
  * etc
* `HTTP Filter` instance will be destroyed once `Envoy` finishes processing the HTTP requests it is associated with

## Metadata

💡 `GetEnvoy Extension Toolkit` relies on metadata to drive various `getenvoy` commands.

Collectively, _metadata_ are all the files under `.getenvoy/extension/` directory in the _extension workspace_.

E.g.,

```shell
$ tree .getenvoy/extension/

.getenvoy/extension/
├── examples
│   └── default
│       ├── README.md
│       ├── envoy.tmpl.yaml
│       ├── example.yaml
│       └── extension.json
├── extension.yaml
└── toolchains
    └── default.yaml
```

💡 _metadata_ files will typically be auto-generated on first use.

### Extension descriptor

💡 `Extension descriptor` represents meta information about the extension, such as extension name, type, programming language, etc.

_Extension descriptor_ is generated automatically by [`getenvoy extension init`].

E.g.,

```yaml
kind: Extension

name: me.filters.http.my_http_filter

category: envoy.filters.http
language: rust

# Runtime the extension is being developed against.
runtime:
  envoy:
    version: wasm:1.15
```

### Toolchain

💡 `Toolchain` represents a configuration of language-specific build tools that get called internally by
   [`getenvoy extension build`], [`getenvoy extension test`], [`getenvoy extension clean`], etc.

`default` _toolchain_ is generated automatically on first use of [`getenvoy extension build`] and is stored under
`.getenvoy/extension/toolchains/`, e.g.

```shell
$ tree .getenvoy/extension/toolchains/

.getenvoy/extension/toolchains
└── default.yaml
```

```yaml
#
# Configuration for the built-in toolchain.
#
kind: BuiltinToolchain

#
# Configuration of the default build container.
#

## container:
##   # Builder image.
##   image: getenvoy/extension-rust-builder:latest
##   # Docker cli options.
##   options: []

#
# Configuration of the 'build' command.
#
# If omitted, configuration of the default build container will be used instead.
#

## build:
##   container:
##     # Builder image.
##     image: getenvoy/extension-rust-builder:latest
##     # Docker cli options.
##     options: []
##   output:
##     # Output *.wasm file.
##     wasmFile: target/getenvoy/extension.wasm

...
```

### Example setups

💡 `Example setup` represents an `Envoy` configuration that demonstrates the extension in action on real traffic.

Every extension can have multiple _Example setups_:

* the `default` _Example setup_ will be generated automatically on first use of [`getenvoy extension run`]
* additional _Example setups_ can be generated explicitly by using [`getenvoy extension examples add`]

_Example setups_ get stored under `.getenvoy/extension/examples/`, e.g.:

```shell
$ tree .getenvoy/extension/examples/

.getenvoy/extension/examples/
└── default
    ├── README.md
    ├── envoy.tmpl.yaml
    ├── example.yaml
    └── extension.json
```

where

| File              | Description              | Purpose                                                                  |
| ----------------- | ------------------------ | ------------------------------------------------------------------------ |
| `README.md`       | `README` file            | Describes individual `Example setup`, provides _How To Use_ instructions |
| `example.yaml`    | `Example` descriptor     | Describes runtime requirements, e.g. a specific version of `Envoy`       |
| `envoy.tmpl.yaml` | `Envoy` bootstrap config | Provides `Envoy` config that demoes extension in action                  |
| `extension.json`  | `Extension` config       | Provides configuration for extension itself                              |

#### example.yaml

💡 _Example setup_ includes a descriptor file `example.yaml` that can be used to express runtime requirements specific to that example.

E.g.,

```yaml
kind: Example

# Runtime required by the example.
runtime:
  envoy:
    version: wasm:1.15
```

#### envoy.tmpl.yaml

💡 _Example setup_ includes a template `Envoy` configuration that is stored in `envoy.tmpl.yaml`.

To the most part, it is a regular `envoy.yaml` bootstrap config file.

Additionaly, contents of `envoy.tmpl.yaml` is also allowed to use placeholders specific to `GetEnvoy Extension Toolkit`.

E.g., by default, `envoy.tmpl.yaml` will have the contents similar to the following:

```yaml
#
# Example Envoy configuration.
#
admin: {{ .GetEnvoy.DefaultValue "admin" }}                 # notice use of the placeholder

static_resources:
  listeners:
    ...
    http_filters:
      - name: envoy.filters.http.wasm
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.http.wasm.v3.Wasm
          config:
            configuration: {{ .GetEnvoy.Extension.Config }} # notice use of the placeholder
            name: {{ .GetEnvoy.Extension.Name }}            # notice use of the placeholder
            vm_config:
              code: {{ .GetEnvoy.Extension.Code }}          # notice use of the placeholder
    ...
```

##### Supported placeholders

| Placeholder                                 | Purpose                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `{{ .GetEnvoy.DefaultValue "<property>" }}` | Gets replaced with the default value of a _given property_.                       |
| `{{ .GetEnvoy.Extension.Name }}`            | Gets replaced with the extension name, e.g. `"me.filters.http.my_http_filter"`.   |
| `{{ .GetEnvoy.Extension.Code }}`            | Gets replaced with a `Datasource` representing the `*.wasm` file.                 |
| `{{ .GetEnvoy.Extension.Config }}`          | Gets replaced with extension config, defaults to the contents of `extension.json` |

##### Supported properties

💡 The following _property names_ can be used in the `{{ .GetEnvoy.DefaultValue "<property>" }}` placeholder:

| Property                       | Gets replaced with (verbatim)                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `admin`                        | `{"accessLogPath":"/dev/null","address":{"socketAddress":{"address":"127.0.0.1","portValue":9901}}}` |
| `admin.access_log_path`        | `"/dev/null"`                                                                                        |
| `admin.address`                | `{"socketAddress":{"address":"127.0.0.1","portValue":9901}}`                                         |
| `admin.address.socket.address` | `"127.0.0.1"`                                                                                        |
| `admin.address.socket.port`    | `9901`                                                                                               |

#### extension.json

💡 _Example setup_ includes extension-specific configuration that is stored in `extension.json`.

Although, extensions are free to choose any format for their configuration, e.g. `JSON`, `YAML`, `Protobuf`, etc,
it is advised to use `JSON` by default to keep the overall ecosystem of extensions consistent.

By default, `extension.json` has no contents.

## Glossary

#### Extension workspace

Refers to the set of files generated by [`getenvoy extension init`].

#### Extension descriptor

Refers to the `.getenvoy/extension/extension.yaml` file generated by [`getenvoy extension init`].

#### Toolchain

Refers to the `.getenvoy/extension/toolchains/default.yaml` file generated on first use of [`getenvoy extension build`].

#### Example setup

Refers to the _Envoy_ configuration generated by [`getenvoy extension examples add`].

`Example setup` represents `Envoy` configuration that demonstrates the extension in action on real traffic.

#### Example descriptor

Refers to the `example.yaml` file of the `Example setup`.

#### WebAssembly module

Refers to the `*.wasm` file generated by [`getenvoy extension build`].

[`Install GetEnvoy`]: /install/cli/binary
[`Install Docker`]: https://docs.docker.com/engine/install/

[`Envoy SDK for Rust`]: https://docs.rs/envoy-sdk/

[`docker.io/getenvoy/extension-rust-builder`]: https://hub.docker.com/r/getenvoy/extension-rust-builder

[`getenvoy extension init`]: /reference/getenvoy_extension_init/
[`getenvoy extension build`]: /reference/getenvoy_extension_build/
[`getenvoy extension test`]: /reference/getenvoy_extension_test/
[`getenvoy extension run`]: /reference/getenvoy_extension_run/
[`getenvoy extension clean`]: /reference/getenvoy_extension_test/
[`getenvoy extension examples add`]: /reference/getenvoy_extension_examples_add/

[`Envoy ABI`]: https://github.com/proxy-wasm/spec
