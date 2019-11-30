# INTRODUCTION
---

## Create Cloud9 Environment

 - Follow the instructions in the links below:
```
https://eksworkshop.com/020_prerequisites/workspace/
```
```
https://eksworkshop.com/020_prerequisites/iamrole/
```
```
https://eksworkshop.com/020_prerequisites/ec2instance/
```
```
https://eksworkshop.com/020_prerequisites/workspaceiam/
```

---

## Install Kubernetes tools

 - Follow the instructions in the links below:
```
https://eksworkshop.com/020_prerequisites/k8stools/
```

---

## Install eksctl

 - Download eksctl 
```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv -v /tmp/eksctl /usr/local/bin
```

 - Check eksctl installation
```
eksctl version
```

 - Enable eksctl bash-completion
```
eksctl completion bash >> ~/.bash_completion
. /etc/profile.d/bash_completion.sh
. ~/.bash_completion
```

---

