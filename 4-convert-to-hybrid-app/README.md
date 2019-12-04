# CONVERT MONOLITH TO HYBRID MICROSERVICES
---

In this section we will convert our application to an hybrid microservices application
We will create two new applications: sum-service and subtraction service (linux microservices)
Then we will update the monolith application and integrate it with the linux microservices

---

## Update the monolith application

 - Update the application to remove the sum and subtraction operations by run:
```
kubectl apply -f ./kubernetes/sum-service/deployment.yaml
```

 - Browse to the application (note that sum and subtraction results are not available):
```
http://<node-ip>:80
```

---

## Deploy the sum-service

 - Deploy the sum-service as a kubernetes deployment by run:
```
kubectl apply -f ./kubernetes/sum-service/deployment.yaml
```

 - Browse to the application (note that sum results are now available):
```
http://<node-ip>:80
```

---

## Deploy the subtraction-service

 - Deploy the subtraction-service as a kubernetes deployment by run:
```
kubectl apply -f ./kubernetes/subtraction-service/deployment.yaml
```

 - Browse to the application (note that subtraction results are now available):
```
http://<node-ip>:80
```

---