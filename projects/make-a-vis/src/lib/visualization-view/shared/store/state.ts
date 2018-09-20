// import {
//   GraphicSymbol,
//   GraphicVariableMapping,
//   DataSource,
//   RecordStream,
//   RecordSet,
//   Visualization,
//   RawData

// } from 'dvl-fw';

export interface VisualizationState {
  k: string;
  // metadata: any;
  // dataSources: DataSource[];
  // recordSets: RecordSet[];
  // graphicVariableMappings: GraphicVariableMapping[];
  // graphicSymbolMappings: GraphicSymbol[];
  // visualizations: Visualization[];
  // rawData: RawData[];
  // plugins: any[];
}


export const INITIAL_VISUALIZATION_STATE: VisualizationState = {
  k: 'temporary',
  // metadata: undefined,
  // dataSources: [],
  // recordSets: [],
  // graphicVariableMappings: [],
  // graphicSymbolMappings: [],
  // visualizations: [],
  // rawData: [],
  // plugins: []
};

