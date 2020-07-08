import { Spec } from 'vega';

import { registerProjectionIfExists } from './register-projection';


/**
 * Geographical zoom configuration.
 *
 * center - Center longitude/latitude pair.
 * zoomLevels - Min/max pair of zoom levels.
 * initialZoom - Initial zoom level.
 */
export interface GeoZoomOptions {
  center: [number, number];
  zoomLevels: [number, number];
  initialZoom?: number;
}

export const INDIANA_ZOOM_CONFIG: GeoZoomOptions = {
  center: [86.44305475, 39.76622477],
  zoomLevels: [3200, 250000],
  initialZoom: 6400,
};

export const USA_ZOOM_CONFIG: GeoZoomOptions = {
  center: [96, 39],
  zoomLevels: [10, 250000],
  initialZoom: 600
};

/**
 * Adds zooming functionality to a vega spec with a geographic projection.
 *
 * @param spec - The vega specification object.
 * @param opts - The zoom configuration.
 */
export function addGeoZoom(spec: Spec, opts: GeoZoomOptions): void {
  const signals = spec.signals || (spec.signals = []);
  const projection = spec.projections[0]; // Assumes single geo projection

  if (projection.type === 'albersUsa') {
    return; // albersUsa only does zoom, no pan. Do not patch in this case.
  }
  registerProjectionIfExists(projection.type as string);
  spec.autosize = {type: 'none', contains: 'padding'};

  signals.push(
    { name: 'tx', update: 'width / 2' },
    { name: 'ty', update: 'height / 2' },
    {
      name: 'scale',
      value: opts.initialZoom != null ? opts.initialZoom : opts.zoomLevels[0],
      on: [{
        events: { type: 'wheel', consume: true },
        update: [
          'clamp(scale * pow(1.0015, -event.deltaY * pow(48, event.deltaMode)), ',
          opts.zoomLevels[0],
          ', ',
          opts.zoomLevels[1],
          ')'
        ].join('')
      }]
    },
    {
      name: 'angles',
      value: [0, 0],
      on: [{
        events: 'mousedown',
        update: '[rotateX, centerY]'
      }]
    },
    {
      name: 'cloned',
      value: null,
      on: [{
        events: 'mousedown',
        update: 'copy(\'' + projection.name + '\')'
      }]
    },
    {
      name: 'start',
      value: null,
      on: [{
        events: 'mousedown',
        update: 'invert(cloned, xy())'
      }]
    },
    {
      name: 'drag',
      value: null,
      on: [{
        events: '[mousedown, window:mouseup] > window:mousemove',
        update: 'invert(cloned, xy())'
      }]
    },
    {
      name: 'delta',
      value: null,
      on: [{
        events: { signal: 'drag' },
        update: '[drag[0] - start[0], start[1] - drag[1]]'
      }]
    },
    {
      name: 'rotateX',
      value: opts.center[0],
      on: [{
        events: { signal: 'delta' },
        update: 'angles[0] + delta[0]'
      }]
    },
    {
      name: 'centerY',
      value: opts.center[1],
      on: [{
        events: { signal: 'delta' },
        update: 'clamp(angles[1] + delta[1], -60, 60)'
      }]
    }
  );

  Object.assign(projection, {
    scale: { signal: 'scale' },
    rotate: [{ signal: 'rotateX' }, 0, 0],
    center: [0, { signal: 'centerY' }],
    translate: [{ signal: 'tx' }, { signal: 'ty' }]
  });
  delete projection.size;
}

/**
 * Patches a vega specification to add geographical zooming focused on Indiana.
 *
 * @param spec - The vega specification object.
 */
export function patchIndianaGeoZoom(spec: Spec): Spec {
  addGeoZoom(spec, INDIANA_ZOOM_CONFIG);
  return spec;
}

/**
 * Patches a vega specification to add geographical zooming focused on USA.
 *
 * @param spec - The vega specification object.
 */
export function patchUsaGeoZoom(spec: Spec): Spec {
  addGeoZoom(spec, USA_ZOOM_CONFIG);
  return spec;
}
