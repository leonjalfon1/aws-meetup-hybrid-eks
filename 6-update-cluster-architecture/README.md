# REMOVE WINDOWS NODES
---

## Inspect node groups

 - Inspect the existent nodegroups using:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```

---

## Remove windows nodes

 - Update the file "linux-cluster.yaml" to add the security group to the cluster nodes:
```
sed -i -e 's#sg-00000000000000000#'"$SECURITY_GROUP_ID"'#g' ./linux-cluster.yaml
```

 - The ClusterConfig yaml is updated to remove the windows nodegroup:
```
cat linux-cluster.yaml
```

 - Remove the windows nodes with eksctl using the following command (can take a couple of minutes):
```
eksctl delete nodegroup -f linux-cluster.yaml --wait --approve
```

---

## Inspect node groups

 - Inspect the existent nodegroups using:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```


