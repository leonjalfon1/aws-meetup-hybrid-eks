# INTRODUCTION
---

## ConfigureCloud9 Workspace for the lab

#### Create Cloud9 Environment

 - Launch Cloud9 in your closest region (oregon, ireland, ohio, singapore)

 - Create an IAM role for your cloud9 environment with the following details:
```
+ Permission to be used by EC2
+ Use the policy "AdministratorAccess"
```

 - Attach the IAM role to your cloud9 environment (EC2 instance)

 - Update the IAM settings in your cloud9 environment
```
1) In cloud9 launch a new "Preferences" tab
2) Select "AWS Settings"
3) Turn off AWS managed temporary credentials
```

 - To ensure temporary credentials aren’t already in place we will also remove any existing credentials file:
```
rm -vf ${HOME}/.aws/credentials
```

 - Configure our aws cli with our current region as default
```
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account)
export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')

echo "export ACCOUNT_ID=${ACCOUNT_ID}" | tee -a ~/.bash_profile
echo "export AWS_REGION=${AWS_REGION}" | tee -a ~/.bash_profile
aws configure set default.region ${AWS_REGION}
aws configure get default.region
```

 - Validate the IAM role
```
aws sts get-caller-identity
```

---

#### Install Kubernetes tools

 - Install kubectl
```
sudo curl --silent --location -o /usr/local/bin/kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.14.6/2019-08-22/bin/linux/amd64/kubectl
sudo chmod +x /usr/local/bin/kubectl
```

 - Install jq, envsubst (from GNU gettext utilities) and bash-completion
```
sudo yum -y install jq gettext bash-completion
```

 - Verify the binaries are in the path and executable
```
for command in kubectl jq envsubst
  do
    which $command &>/dev/null && echo "$command in path" || echo "$command NOT FOUND"
  done
```

- Enable kubectl bash_completion
```
kubectl completion bash >>  ~/.bash_completion
. /etc/profile.d/bash_completion.sh
. ~/.bash_completion
```

---

#### Install eksctl

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

## Review the use case and meet the demo application

#### Use Case

 - Convert a windows monolith application into a linux microservices

#### Demo Application

 - The demo application is a web calculator
 - Currently is working as a monolith (all the operations are done under the same service)
 - We will run the applications as kubernetes deployments
 - The application will be exposed using NodePort services

[[[image]]]

 - Our target is transform the monolith (port 30000) into 5 microservices:
   - sum-service (port 30001)
   - subtraction-service (port 30002)
   - multiplication-service (port 30003)
   - division-service (port 30004)
   - ui-service (port 30005)