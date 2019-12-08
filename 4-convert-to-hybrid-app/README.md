# CONVERT MONOLITH TO HYBRID MICROSERVICES
---

In this section we will convert our application to an hybrid microservices application
We will create two new applications: sum-service and subtraction service (linux microservices)
Then we will update the monolith application and integrate it with the linux microservices

---

## Deploy the sum-service

 - Deploy the sum-service by run:
```
kubectl apply -f ./kubernetes/sum-service/
```

 - Browse to the application:
```
http://<cluster-node-ip>:30001/sum/2/3
```

---

## Deploy the subtraction-service

 - Deploy the subtraction-service by run:
```
kubectl apply -f ./kubernetes/subtraction-service/
```

 - Browse to the application:
```
http://<cluster-node-ip>:30002/subtraction/7/2
```

---

## Update the monolith application

 - Create a environment variable to store a node IP
```
CLUSTER_NODES_IPS=$(kubectl get nodes -o json | jq -r '.items[] | .status .addresses[] | select(.type=="ExternalIP") | .address')
CLUSTER_NODE_IP=$(echo $CLUSTER_NODES_IPS | awk -F'[ ]' '{print $1}')
echo CLUSTER_NODE_IP: $CLUSTER_NODE_IP
```

 - Edit the deployment.yaml to set the SERVICE_IP (the IP of any cluster node)
```
sed -i -e 's#<CLUSTER-NODE-API>#'"$CLUSTER_NODE_IP"'#g' ./kubernetes/hybrid/deployment.yaml
```

 - Update the application to remove the sum and subtraction operations and use the micrososervices instead:
```
kubectl apply -f ./kubernetes/hybrid/
```

## Access the Application

 - Wait until the depluyment is ready:
```
kubectl get pods -w
```

 - Browse to the main application:
```
http://<cluster-node-ip>:30000
```

---