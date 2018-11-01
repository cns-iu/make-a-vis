// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataSource } from '../../shared/data-source';
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { GraphicVariable } from '../../shared/graphic-variable';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';
import { RecordSet } from '../../shared/record-set';
import { RecordStream } from '../../shared/record-stream';
import { Visualization } from '../../shared/visualization';


export class DefaultProject implements Project {
  apiVersion = '1';
  metadata: any = { dateCreated: new Date() };
  dataSources: DataSource[] = [];
  recordSets: RecordSet[] = [];
  graphicVariables: GraphicVariable[] = [];
  graphicSymbols: GraphicSymbol[] = [];
  visualizations: Visualization[] = [];
  rawData: RawData[] = [];

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
        if (search[key] !== d[key]) {
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
    const p = context = new DefaultProject();
    // Make sure raw data is parsed first
    p.rawData = await registry.fromJSONArray<RawData>('rawData', 'default', data.rawData, context);
    p.metadata = data.metadata || undefined;
    p.dataSources = await registry.fromJSONArray<DataSource>('dataSource', 'default', data.dataSources, context);
    p.recordSets = await registry.fromJSONArray<RecordSet>('recordSet', 'default', data.recordSets, context);
    p.graphicVariables =
      await registry.fromJSON<GraphicVariable[]>('graphicVariableMappings', 'default', data.graphicVariableMappings, context);
    p.graphicSymbols =
      await registry.fromJSONArray<GraphicSymbol>('graphicSymbolMappings', 'default', data.graphicSymbolMappings, context);
    p.visualizations = await registry.fromJSONArray<Visualization>('visualization', 'default', data.visualizations, context);
    return p;
  }

  async toJSON(instance: Project, context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    instance.metadata.dateSaved = new Date();
    const data: any = {
      apiVersion: 1,
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
