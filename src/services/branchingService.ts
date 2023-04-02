import { DataDefinition } from "../types/dataDefinition";
import { Engine } from "json-rules-engine";
import * as _ from "lodash";
import { FormFlow } from "../types/formFlow";
import { TopLevelCondition,Rule } from "json-rules-engine";

const findNextDataPointId = async (
  formFlow: FormFlow,
  dataDefinition: DataDefinition,
  userInput: string
): Promise<string | null> => {
  const edges = formFlow.edges;
  const noConditionDataPoints: string[] = [];
  const truthyDataPoints: string[] = [];
  const engine = new Engine();
  
  await Promise.all(
    edges.map(async (edge) => {
      if (!_.isEmpty(edge.conditions)) {
        const rule = new Rule({
          conditions: edge.conditions as TopLevelCondition,
          event: edge.event as Event,
        })
        engine.addRule(rule);
        let facts = {
          fact: userInput,
        };
        await engine.run(facts).then(({ events }) => {
          if (events.length > 0) {
            truthyDataPoints.push(edge.next);
          }
        });
        // Remove existing rules, so that the engine instance can be used in the next iteration
        engine.removeRule(rule.name)
      } else {
        noConditionDataPoints.push(edge.next);
      }
    })
  );

  return getValidNextDataPointId(noConditionDataPoints, truthyDataPoints);
};

const getValidNextDataPointId = (
  noConditionDataPoints: string[],
  truthyDataPoints: string[]
) => {
  if (!_.isEmpty(truthyDataPoints)) {
    return truthyDataPoints[0];
  } else if (!_.isEmpty(noConditionDataPoints)) {
    return noConditionDataPoints[0];
  } else {
    return null;
  }
};

export { findNextDataPointId };
