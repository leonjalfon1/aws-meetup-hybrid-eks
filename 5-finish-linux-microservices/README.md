# FINISH LINUX MICROSERVICES
---

In this section we will finish to convert our application to an linux microservices
We will create two new applications: multiplication-service and division-service
Then we will update the monolith application to run on linux as a ui-services

---

## Deploy the multiplication-service

 - Deploy the multiplication-service as a kubernetes deployment by run:
```
kubectl apply -f ./kubernetes/multiplication-service/deployment.yaml
```

---

## Deploy the division-service

 - Deploy the division-service as a kubernetes deployment by run:
```
kubectl apply -f ./kubernetes/division-service/deployment.yaml
```

---

## Convert monolith application to linux ui-service

 - Remove the monolith deployment (windows)
```
kubectl delete deployment monolith
```
 
 - Deploy the ui-service (linux)
```
kubectl apply -f ./kubernetes/ui-service/deployment.yaml
```

 - Browse to the application (note that sum and subtraction results are not available):
```
http://<node-ip>:80
```

---