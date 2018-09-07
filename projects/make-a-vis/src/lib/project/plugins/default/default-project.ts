import { DataSource } from '../../shared/data-source';
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordSet } from '../../shared/record-set';
import { RecordStream } from '../../shared/record-stream';
import { Visualization } from '../../shared/visualization';
import { GraphicVariable } from './../../shared/graphic-variable';
import { RawData } from './../../shared/raw-data';


export class DefaultProject implements Project {
  apiVersion = '1';
  metadata: any = { dateCreated: new Date() };
  dataSources: DataSource[] = [];
  recordSets: RecordSet[] = [];
  graphicVariables: GraphicVariable[] = [];
  graphicSymbols: GraphicSymbol[] = [];
  visualizations: Visualization[] = [];
  rawData: RawData[] = [];
  plugins: any[] = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  getRecordStream<T>(id: string): RecordStream<T> {
    for (const dataSource of this.dataSources) {
      for (const stream of dataSource.recordStreams) {
        if (stream.id === id) {
          return stream;
        }
      }
    }
    return null;
  }

  findObjects<T>(data: T[], search: { [key: string]: any; }): T[] {
    return data.filter((d) => {
      for (const key in search) {
        if (search[key] !== data[key]) {
          return false;
        }
      }
      return true;
    });
  }
}

export class DefaultProjectFactory implements ObjectFactory<Project, Project> {
  id = 'default';
  type = 'project';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Project> {
    // Make sure raw data is parsed first
    const rawData = await registry.fromJSONArray<RawData>('rawData', 'default', data.rawData, context);

    const metadata = data.metadata || undefined;
    const dataSources = await registry.fromJSONArray<DataSource>('dataSource', 'default', data.dataSources, context);
    const recordSets = await registry.fromJSONArray<RecordSet>('recordSet', 'default', data.recordSets, context);
    const graphicVariables =
      await registry.fromJSON<GraphicVariable[]>('graphicVariableMappings', 'default', data.graphicVariableMappings, context);
    const graphicSymbols =
      await registry.fromJSONArray<GraphicSymbol>('graphicSymbolMappings', 'default', data.graphicSymbolMappings, context);
    const visualizations = await registry.fromJSONArray<Visualization>('visualization', 'default', data.visualizations, context);

    return new DefaultProject({ metadata, rawData, dataSources, recordSets, graphicVariables, graphicSymbols, visualizations });
  }

  async toJSON(instance: Project, context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    instance.metadata.dateSaved = new Date();
    const data: any = {
      metadata: instance.metadata,
      dataSources: await registry.toJSONArray<DataSource>('dataSource', 'default', instance.dataSources, instance),
      recordSets: await registry.toJSONArray<RecordSet>('recordSet', 'default', instance.recordSets, instance),
      graphicVariableMappings:
        await registry.toJSON<GraphicVariable[]>('graphicVariableMappings', 'default', instance.graphicVariables, instance),
      graphicSymbolMappings:
        await registry.toJSONArray<GraphicSymbol>('graphicSymbolMappings', 'default', instance.graphicSymbols, instance),
      visualizations: await registry.toJSONArray<Visualization>('visualization', 'default', instance.visualizations, instance),
      rawData: await registry.toJSONArray<RawData>('rawData', 'default', instance.rawData, instance),
    };

    return data;
  }
}
