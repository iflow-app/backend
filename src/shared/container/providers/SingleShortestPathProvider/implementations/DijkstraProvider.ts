import Graph from "node-dijkstra";

import { HouseOfQuality } from "../../../../../modules/requirements/entities/HouseOfQuality";
import { ISingleShortestPathProvider } from "../ISingleShortestPathProvider";

interface IPathResult {
  path: string[];
  cost: number;
}

class DijkstraProvider implements ISingleShortestPathProvider {
  run(data: HouseOfQuality[]): number[] {
    const graph = new Graph();

    const relations = {};
    const nfunctionalIds = [];

    data.map((relation) => {
      const { weight } = relation;

      const functional_id = relation.functional_id.toString();
      const nfunctional_id = relation.nfunctional_id.toString();

      if (!(functional_id in relations)) relations[functional_id] = {};
      if (!(nfunctional_id in relations)) relations[nfunctional_id] = {};

      relations[functional_id][nfunctional_id] = weight;
      relations[nfunctional_id][functional_id] = weight;

      nfunctionalIds.push(nfunctional_id);

      return null;
    });

    Object.keys(relations).map((key) => graph.addNode(key, relations[key]));

    const uniqueNfunctionalIds = [...new Set(nfunctionalIds)];

    const paths = uniqueNfunctionalIds.flatMap((S, i) =>
      uniqueNfunctionalIds.slice(i + 1).map(
        (V) =>
          graph.path(S.toString(), V.toString(), {
            cost: true,
          }) as IPathResult
      )
    );

    const pathsCosts = paths.map((path) => path.cost);
    const greatestPathCostIndex = pathsCosts.indexOf(Math.max(...pathsCosts));

    const pathCasted = paths[greatestPathCostIndex].path.map((functional_id) =>
      parseInt(functional_id, 10)
    );

    return pathCasted;
  }
}

export { DijkstraProvider };
