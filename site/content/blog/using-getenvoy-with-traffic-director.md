+++
tags = []
categories = []
title = "Using GetEnvoy with Google Traffic Director"
abstract = "Learn how to leverage GetEnvoy's distribution of Envoy with Traffic Director."
date = 2019-07-05T00:00:00+00:00
authors = ["Liam White"]
+++

Traffic Director is a hosted Envoy control plane offering on Google Cloud Platform. Currently to deploy Envoy on VMs their [documentation](https://cloud.google.com/traffic-director/docs/setting-up-traffic-director) suggests the following:

1. Install Docker on your local machine.
2. Pull the Istio Envoy proxy image from Dockerhub.
3. Copy the Envoy binary out to your local machine.
4. Copy the Envoy to all the machines you want to deploy to.
5. Run the Envoy instances.

If you're deploying on VMs this may seem like a weird approach to deploying things. Why not use a package manager to distribute Envoy? The answer is that the only artefact distributed by the project is a Docker image. This is why we have to copy the binary from within the Docker image.

Another factor to consider is that the default image is the Istio image not an Envoy image. In Istio, the Envoy versioning follows Istio's version not Envoys. For instance, at time of writing the current version of Istio proxy is `1.1.8`, and this uses Envoy at commit `52a04b6c55b7f6d5646c0fb235ce403394f67839`. This is not an official Envoy release version, it's somewhere between 1.10.0 and the future 1.11.0 release. Using a package manager rather than the Istio DockerHub image allows you to clearly and explicitly manage the version of the Envoy you're deploying via a package manager with Envoy versioning.

The GetEnvoy project mantains Stable and Nightly builds of Envoy for Ubuntu, Debian, CentOS and RHEL distributed via `apt` and `yum`. These builds can be used to distribute Envoys to your VMs and connect your VM based workloads to Traffic Director. 

Rather than running the `pull_envoy.sh` script provided in the documentation, you just need to ensure that Envoy is installed on the machine and there is a sym-link to directory that the provided `run.sh` is in. The steps to connecting a single VM to the Traffic Director xDS API are as follows:

1. **Install Envoy on the VM.**
For more detailed instructions checkout our [installation guides](https://getenvoy.io/platforms).
```sh
$ sudo apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
curl -sL 'https://getenvoy.io/gpg' | sudo apt-key add - && \
sudo add-apt-repository "deb [arch=amd64] https://dl.bintray.com/tetrate/getenvoy-deb $(lsb_release -cs) stable" && \
sudo apt-get update && sudo apt-get install -y getenvoy-envoy
```


1. **Get the Traffic Director helper scripts onto the VM.**
```sh
$ wget https://storage.googleapis.com/traffic-director/traffic-director.tar.gz && \
tar -xzvf traffic-director.tar.gz && \
cd traffic-director
```

1. **Edit the `sidecar.env` to use the correct user.**
```sh
$ sed -ie "s|ENVOY_USER=''|ENVOY_USER='$(whoami)'|g" sidecar.env
```

1. **Sym-link the installed Envoy to the directory on the `run.sh` script.**
```sh
$ ln -s /usr/bin/envoy ./envoy
```

1. **Run Envoy using the provided helper script.**
```sh
$ sudo ./run.sh start
```

1. **Verify that Envoy is running.**
```sh
$ ps aux | grep envoy
```
```sh-output
liam      2662  0.3  0.8 131596 30640 ?        Sl   14:45   0:00 ./envoy --config-path ./bootstrap_instance.yaml --log-level info --allow-unknown-fields
liam      2739  0.0  0.0  12752   988 pts/0    S+   14:45   0:00 grep envoy
```

Assuming you have set up Traffic Director correctly, the Envoy instance will now be connected to Traffic Director. For instructions on setting up Traffic Director to understand your topology follow the [Setting Up Traffic Director](https://cloud.google.com/traffic-director/docs/setting-up-traffic-director) how-to guide.
