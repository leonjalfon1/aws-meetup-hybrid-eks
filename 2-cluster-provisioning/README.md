# CLUSTER PROVISIONING
---

## Create the configuration file

 - To create creating a fully-functioning cluster in a single command use a configuration file like the below:
```
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: leonj-aws-meetup
  region: ap-southeast-1

nodeGroups:
  - name: windows-nodes
    amiFamily: WindowsServer2019FullContainer
    minSize: 1
    maxSize: 3
    desiredCapacity: 2
  - name: linux-nodes
    instanceType: t2.large
    minSize: 1
    maxSize: 3
    desiredCapacity: 2
```

---

## Deploy the EKS cluster

 - To deploy the EKS cluster use the command below (use the flag --install-vpc-controllers to install required tools for windows nodes):

```
$ eksctl create cluster -f cluster.yaml --install-vpc-controllers
```

---

## Notes

 - You can inspect the cluster nodegroups by run:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```

 - To scale node group you can use:
```
eksctl scale nodegroup --cluster=leonj-aws-meetup --nodes=5 --name=linux-nodes
```

 - You can delete the cluster by using the command below:
```
$ eksctl delete cluster --name=leonj-aws-meetup --region=ap-southeast-1
```

---