# DEPLOY WINDOWS MONOLITH APP
---

In this section we will deploy a monolith windows application in our cluster
Note that the deployment is using nodeSelector to ensure that application pods will be scheduled on windows nodes

---

## Deploy the Application

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
http://<node-ip>:80
```

**<node-ip>: The IP of any of the cluster nodes

---
