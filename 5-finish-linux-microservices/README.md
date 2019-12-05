# FINISH LINUX MICROSERVICES
---

In this section we will finish to convert our application to an linux microservices
We will create two new applications: multiplication-service and division-service
Then we will update the monolith application to run on linux as a ui-services

---

## Deploy the multiplication-service

 - Deploy the multiplication-service by run:
```
kubectl apply -f ./kubernetes/multiplication-service/
```

---

## Deploy the division-service

 - Deploy the division-service by run:
```
kubectl apply -f ./kubernetes/division-service/
```

---

## Convert monolith application to linux ui-service

 - Deploy the ui-service (linux)
```
kubectl apply -f ./kubernetes/ui-service/
```

 - Remove the monolith deployment (windows)
```
kubectl delete deployment monolith
```


 - Browse to the application (note that sum and subtraction results are not available):
```
http://<node-ip>:80
```

---