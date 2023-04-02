import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { Output } from "@pulumi/pulumi";

const env = pulumi.getStack();

export class SecurityGroup {
  sgId: Output<string>;
  constructor() {
    this.sgId = new aws.ec2.SecurityGroup(`${process.env.PROJECT_NAME}_sg`, {
      description: "Allow traffic to instance",
      ingress: [
        {
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
          cidrBlocks: ["0.0.0.0/0"],
          ipv6CidrBlocks: ["::/0"],
        }
      ],
      egress:[
        {
          fromPort: 0,
          toPort: 0,
          protocol: "-1",
          cidrBlocks: ["0.0.0.0/0"],
          ipv6CidrBlocks: ["::/0"],
        },
      ]
    }).id;
  }
}
