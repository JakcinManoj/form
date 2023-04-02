import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import { ApplicationListener } from "@pulumi/awsx/classic/lb";

const env = pulumi.getStack();

export class FargateService {
  //Create/update fargate service
  constructor(
    sgid: string,
    imageName: string,
    applicationListener: ApplicationListener,
    cluster: awsx.classic.ecs.Cluster
  ) {
    //Create fargate service
    const containerName = process.env.PROJECT_NAME
      ? process.env.PROJECT_NAME
      : "container";
    new awsx.classic.ecs.FargateService(
      `${process.env.PROJECT_NAME}-service-${env}`,
      {
        cluster: cluster,
        desiredCount: Number(process.env.FARGATE_DESIRED_COUNT),
        forceNewDeployment: true,
        waitForSteadyState: false,
        enableExecuteCommand: true,
        healthCheckGracePeriodSeconds: 600,
        assignPublicIp: true,
        loadBalancers: [
          {
            targetGroupArn:
              applicationListener.defaultTargetGroup?.targetGroup.arn,
            containerName: containerName,
            containerPort: Number(
              process.env.DATA_INGESTION_API_CONTAINER_PORT
            ),
          },
        ],
        securityGroups: [sgid],
        taskDefinitionArgs: {
          cpu: `${process.env.FARGATE_CPU}`,
          memory: `${process.env.FARGATE_MEMORY}`,
          containers: {
            [containerName]: {
              image: imageName,
              portMappings: [
                {
                  containerPort: Number(
                    process.env.DATA_INGESTION_API_CONTAINER_PORT
                  ),
                },
              ],
            },
          },
        },
      }
    );
  }
}
