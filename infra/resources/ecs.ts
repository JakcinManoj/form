import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";
import { OutputInstance } from "@pulumi/pulumi";

const env = pulumi.getStack();

export function createECRRepository(): OutputInstance<string> {
  // Create repository
  const dataIngestionAPIRepo = new aws.ecr.Repository(
    `${process.env.PROJECT_NAME}-${env}`,
    {
      imageScanningConfiguration: {
        scanOnPush: true,
      },
      imageTagMutability: "MUTABLE",
    }
  );

  // Set credentials for pushing image
  const registryInfo = dataIngestionAPIRepo.registryId.apply(
    async (id: string) => {
      const credentials = await aws.ecr.getCredentials({ registryId: id });
      const decodedCredentials = Buffer.from(
        credentials.authorizationToken,
        "base64"
      ).toString();
      const [username, password] = decodedCredentials.split(":");
      if (!password || !username) {
        throw new Error("Invalid credentials");
      }
      return {
        server: credentials.proxyEndpoint,
        username: username,
        password: password,
      };
    }
  );

  const imageName = dataIngestionAPIRepo.repositoryUrl;
  const customImage = process.env.PROJECT_NAME as string;
  const imageVersion = process.env.PROJECT_NAME_VERSION as string;
  const image = new docker.Image(customImage, {
    build: "./../code",
    imageName: pulumi.interpolate`${imageName}:${imageVersion}`,
    registry: registryInfo,
  });

  return image.imageName;
}
