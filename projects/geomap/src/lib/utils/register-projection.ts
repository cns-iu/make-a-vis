import * as d3Projections from 'd3-geo-projection';
import { projection as vegaProjections } from 'vega';


export function registerProjectionIfExists(projection: string): void {
  const projectionFunction = 'geo' + projection[0].toUpperCase() + projection.slice(1);
  if (d3Projections && d3Projections[projectionFunction]) {
    vegaProjections(projection, d3Projections[projectionFunction]);
  }
}
