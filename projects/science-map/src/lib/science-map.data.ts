import underlyingScimapData from './science-map.data.json';

interface ScienceMapData {
  nodes: {
    y: number;
    x: number;
    subd_id: number;
    disc_id: number;
    mod_x: number;
    mod_y: number;
    subd_name: string;
    size: number;
  }[];
  edges: {
    subd_id1: number;
    subd_id2: number;
    weight: number;
  }[];
  disciplines: {
    disc_id: number;
    disc_name: string;
    color: string;
    x: number;
    y: number;
  }[];
  labels: {
    disc_id: number;
    disc_name: string;
    color: string;
    x: number;
    y: number;
  }[];
}

export const scienceMapData: ScienceMapData = underlyingScimapData as ScienceMapData;
