# CLUSTER PROVISIONING
---

 - In this section we will create an environment using cloud9 to perform all the other steps and we will meet our demo application.
 
- Content:

   - Create an EKS cluster
   - Meet the demo application
   - Create a security group to expose application ports
   - Create the cluster nodes (windows and linux)

---

## Create an EKS cluster

 -  To create an empty cluster (only control plane without nodes) with eksctl, run:
```
eksctl create cluster --name leonj-aws-meetup --region ap-southeast-1 --without-nodegroup
```

---

## Create a security group to expose application ports

 - Store the cluster VPC ID in a variable
```
CLUSTER_VPC_ID=$(eksctl get cluster --region ap-southeast-1 --name leonj-aws-meetup -o json | jq -r '.[].ResourcesVpcConfig.VpcId')

echo CLUSTER_VPC_ID: $CLUSTER_VPC_ID
```

 - Create the security group by run:
```
SECURITY_GROUP_ID=$(aws ec2 create-security-group \
  --group-name "aws-meetup-hybrid-eks" \
  --description "AWS Meetup Hybrid EKS - Expose ports 30000-30005" \
  --region=ap-southeast-1 \
  --vpc-id $CLUSTER_VPC_ID \
  --output json \
  | jq -r .GroupId )

echo SECURITY_GROUP_ID: $SECURITY_GROUP_ID
```

 - Configure the security group to expose ports 30000-30005:
```
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 30000, "ToPort": 30005, "Ipv6Ranges": [{"CidrIpv6": "::/0", "Description": "Expose ports 30000-30005"}]}]' \
  --region=ap-southeast-1
```
```
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 30000, "ToPort": 30005, "IpRanges": [{"CidrIp": "0.0.0.0/0", "Description": "Expose ports 30000-30005"}]}]' \
  --region=ap-southeast-1
```

## Create the cluster nodes (windows and linux)

 - Update the file "hybrid-cluster.yaml" to add the security group to the cluster nodes:
```
sed -i -e 's#sg-00000000000000000#'"$SECURITY_GROUP_ID"'#g' ./hybrid-cluster.yaml
```

 - Check the ClusterConfig yaml (used to manage the cluster with infrastrure as code):
```
cat ./hybrid-cluster.yaml
```

 - Use eksctl to create the cluster nodes based on the configuration:
```
eksctl create nodegroup -f ./hybrid-cluster.yaml 
```

 - Install the windows VPC controller:
```
eksctl utils install-vpc-controllers --cluster=leonj-aws-meetup --region=ap-southeast-1 --approve
```

---

## Notes

 - You can inspect the cluster nodegroups by run:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
```

 - You can remove a cluster nodegroup by run:
```
eksctl delete nodegroup <nodegroup-name> --cluster=leonj-aws-meetup --region=ap-southeast-1
```

 - To scale a node group you can use:
```
eksctl scale nodegroup --cluster=leonj-aws-meetup --nodes=5 --name=linux-nodes
```

 - You can delete the cluster by using the command below:
```
$ eksctl delete cluster --name=leonj-aws-meetup --region=ap-southeast-1
```

---