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

 - We will use a ClusterConfig yaml to manage the cluster using infrastructure as code:
```
cat ./empty/empty-cluster.yaml
```

 -  To create an empty cluster usign eksctl run:
```
eksctl create cluster -f ./empty/empty-cluster.yaml --without-nodegroup
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

<image>

 - Our target is transform the monolith into 5 microservices:
   - ui-service (port 30000)
   - sum-service (port 30001)
   - subtraction-service (port 30002)
   - multiplication-service (port 30003)
   - division-service (port 30004)

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

 - Configure the security group to expose ports 30000-30004:
```
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 30000, "ToPort": 30005, "Ipv6Ranges": [{"CidrIpv6": "::/0", "Description": "Expose ports 30000-30004"}]}]' \
  --region=ap-southeast-1
```
```
aws ec2 authorize-security-group-ingress \
  --group-id $SECURITY_GROUP_ID \
  --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 30000, "ToPort": 30005, "Ipv6Ranges": [{"CidrIpv6": "0.0.0.0/0", "Description": "Expose ports 30000-30004"}]}]' \
  --region=ap-southeast-1
```

## Create the cluster nodes (windows and linux)

 - Update the file "hybrid-cluster-sg.yaml" to add the security group to the cluster nodes:
```
sed -i -e 's#sg-00000000000000000#'"$SECURITY_GROUP_ID"'#g' ./nodes/hybrid-cluster.yaml
```

 - Check the ClusterConfig yaml:
```
cat ./nodes/hybrid-cluster.yaml
```

 - Use eksctl to create the cluster nodes based on the configuration:
```
eksctl create nodegroup -f ./nodes/hybrid-cluster.yaml 
```

 - Install the windows VPC controller:
```
eksctl utils install-vpc-controllers --name=leonj-aws-meetup --region=ap-southeast-1 --approve
```

---

## Notes

 - You can inspect the cluster nodegroups by run:
```
eksctl get nodegroup --cluster=leonj-aws-meetup --region=ap-southeast-1
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