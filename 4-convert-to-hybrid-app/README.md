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
http://<ip>:30001/sum/2/3
```

---

## Deploy the subtraction-service

 - Deploy the subtraction-service by run:
```
kubectl apply -f ./kubernetes/subtraction-service/
```

 - Browse to the application:
```
http://<ip>:30002/subtraction/7/2
```

---

## Update the monolith application

 - Update the application to extract the sum and subtraction operations by run:
```
kubectl apply -f ./kubernetes/monolith/
```

 - Browse to the main application:
```
http://<ip>:80
```

---