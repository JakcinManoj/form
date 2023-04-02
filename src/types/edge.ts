import { TopLevelCondition } from 'json-rules-engine'


export type Edge = {
  id: number,
  conditions: Object,
  event: Object,
  next: string
}
