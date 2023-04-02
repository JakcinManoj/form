import { createECRRepository } from "./resources/ecs";
import { SecurityGroup } from "./resources/securitygroup";
import { ApplicationListener } from "./resources/lb";
import { FargateService } from "./resources/fargate";
import * as dotenv from "dotenv";
import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
dotenv.config();

const env = pulumi.getStack();

//Create cluster
const cluster = new awsx.classic.ecs.Cluster(
  `${process.env.APP_NAME}-cluster-${env}`
);

//Create security group
const securityGroup = new SecurityGroup().sgId;

securityGroup.apply((sgId) => {
  //Create application load balancer
  const applicationListener = new ApplicationListener(sgId);

  //Create ECR repository
  createECRRepository().apply((imageName) => {
    //Create ECS service
    new FargateService(
      sgId,
      imageName,
      applicationListener.applicationListener,
      cluster
    );
  });
});
