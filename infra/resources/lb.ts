import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import { Output } from "@pulumi/pulumi";

const env = pulumi.getStack();

export class ApplicationListener {
  applicationListener: awsx.classic.lb.ApplicationListener;
  //Create application load balancer
  constructor(sgid:string) {
    this.applicationListener = new awsx.classic.lb.ApplicationListener(
      `${process.env.APP_NAME}-lb-${env}`,
      {
        external: true,
        port: 80,
        targetGroup: {
          port: 80,
          protocol: "HTTP",
          healthCheck: {
            path: "/health",
          },
        },
        loadBalancer: {
          securityGroups: [sgid],
        },
      }
    );
  }
}
