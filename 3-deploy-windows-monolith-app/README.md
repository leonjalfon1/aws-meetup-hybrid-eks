# DEPLOY WINDOWS MONOLITH APP
---

In this section we will deploy a monolith windows application in our cluster
Note that the deployment is using nodeSelector to ensure that application pods will be scheduled on windows nodes

---

## Deploy the Application

 - Create a variable to store a node IP
```
CLUSTER_NODES_IPS=$(kubectl get nodes -o json | jq -r '.items[] | .status .addresses[] | select(.type=="ExternalIP") | .address')
CLUSTER_NODE_IP=$(echo $CLUSTER_NODES_IPS | awk -F'[ ]' '{print $1}')
echo CLUSTER_NODE_IP: $CLUSTER_NODE_IP
```

 - Edit the deployment.yaml (line 24) to set the SERVICE_IP (the IP of any cluster node)
```
sed -i -e 's#<CLUSTER-NODE-API>#'"$CLUSTER_NODE_IP"'#g' ./kubernetes/monolith/deployment.yaml
```

 - Deploy the application as a kubernetes deployment by run:
```
kubectl apply -f ./kubernetes/monolith/deployment.yaml
```

 - Create a service to expose the application:
```
kubectl apply -f ./kubernetes/monolith/service.yaml
```

---

## Access the Application

 - Browse to:
```
http://<cluster-node-ip>:30000
```

**<cluster-node-ip>: The IP of any of the cluster nodes

---
