# FINISH LINUX MICROSERVICES
---

In this section we will finish to convert our application to an linux microservices
We will create two new applications: multiplication-service and division-service
Then we will replace the monolith application (windows) with the ui-service (linux)

---

## Deploy the multiplication-service

 - Deploy the multiplication-service by run:
```
kubectl apply -f ./kubernetes/multiplication-service/
```

 - Browse to the application:
```
http://<cluster-node-ip>:30003/multiplication/3/3
```

---

## Deploy the division-service

 - Deploy the division-service by run:
```
kubectl apply -f ./kubernetes/division-service/
```

 - Browse to the application:
```
http://<cluster-node-ip>:30004/division/8/2
```

---

## Convert monolith application to linux ui-service

 - Create a variable to store a node IP
```
CLUSTER_NODES_IPS=$(kubectl get nodes -o json | jq -r '.items[] | .status .addresses[] | select(.type=="ExternalIP") | .address')
CLUSTER_NODE_IP=$(echo $CLUSTER_NODES_IPS | awk -F'[ ]' '{print $1}')
echo CLUSTER_NODE_IP: $CLUSTER_NODE_IP
```

 - Edit the deployment.yaml to set the SERVICE_IP (the IP of any cluster node)
```
sed -i -e 's#<CLUSTER-NODE-API>#'"$CLUSTER_NODE_IP"'#g' ./kubernetes/ui-service/deployment.yaml
```

 - Deploy the ui-service (linux)
```
kubectl apply -f ./kubernetes/ui-service/
```

## Access the Application

 - Wait until the deployment is ready:
```
kubectl get pods -w
```

 - Browse to the application (note that sum and subtraction results are not available):
```
http://<cluster-node-ip>:30005
```

## Remove the monolith after test the application

 - Remove the monolith deployment (windows)
```
kubectl delete deployment calculator-app
kubectl delete service calculator-app
```

---