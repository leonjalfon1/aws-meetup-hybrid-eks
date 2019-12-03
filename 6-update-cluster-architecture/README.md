# REMOVE WINDOWS NODES
---

## Inspect node groups

 - Inspect the existent nodegroups using:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```

---

## Remove windows nodes

 - Remove the windows nodes with eksctl using the following command (can take a couple of minutes):
```
eksctl delete nodegroup --cluster=leonj-aws-meetup --name=windows-nodes --region=ap-southeast-1
```

---

## Inspect node groups

 - Inspect the existent nodegroups using:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```


