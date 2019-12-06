# AWS Meetup: Building Hybrid Microservices on EKS

This repository summarize the meetup that took place on Sunday 08/12 at AWS offices on Floor 28, Tel Aviv.
During the talk we spoke about how to deploy and manage hybrid microservices on EKS (windows and linux containers). 
In this repo you will find the steps to review one of the most common use cases "how to convert a windows monolith application into a linux microservices"

## 1) Introduction

 - In this section we will create an environment using cloud9 to perform all the other steps and we will meet our demo application

## 2) Cluster Provisioning

 - In this section we will create an hybrid EKS cluster using eksctl

## 3) Deploy Windows Monolith Application

 - In this section we will deploy a monolith application in a single windows container

## 4) Convert Monolith into a Hybrid Application

 - In this section we will deploy 2 linux microservices and we will update the monolith application to work against those microservices

## 5) Finish the Transformation to Linux Microservices

 - In this section we will finish the transformation by replace the windows monolith application with 3 linux microservices

## 6) Update the Cluster Architecture

 - Finally we will remove the windows nodes from our EKS cluster by using eksctl
 
