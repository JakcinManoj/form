import { DataDefinition } from "./dataDefinition";
import { Edge } from "./edge";
import { FormFlow } from "./formFlow";
import { Layout } from "./layout";

export type FormModel = {
  formFlow: Record <string, FormFlow>,
  dataDefinitions: Record<string, DataDefinition>
  layouts: Layout[]
}
