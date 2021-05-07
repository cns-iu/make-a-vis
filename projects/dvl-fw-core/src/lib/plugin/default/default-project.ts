import { DataSource, GraphicSymbol, GraphicVariable, Project, RawData, RecordSet, RecordStream, Visualization } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';

export type DefaultProjectArg = any; // FIXME: This is likely incorrect

export class DefaultProject implements Project {
  apiVersion = '1';
  metadata: any = { dateCreated: new Date() };
  dataSources: DataSource[] = [];
  recordSets: RecordSet[] = [];
  graphicVariables: GraphicVariable[] = [];
  graphicSymbols: GraphicSymbol[] = [];
  visualizations: Visualization[] = [];
  rawData: RawData[] = [];

  constructor(data: DefaultProjectArg = {}) {
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

  async fromJSON(data: any, _context: Project, registry: ObjectFactoryRegistry): Promise<Project> {
    const ctx = new DefaultProject();
    // Make sure raw data is parsed first
    ctx.rawData = await registry.fromJSONArray<RawData>('rawData', 'default', data.rawData, ctx);
    ctx.metadata = data.metadata || undefined;
    ctx.dataSources = await registry.fromJSONArray<DataSource>('dataSource', 'default', data.dataSources, ctx);
    ctx.recordSets = await registry.fromJSONArray<RecordSet>('recordSet', 'default', data.recordSets, ctx);
    ctx.recordSets.forEach(rs => rs.resolveParent(ctx.recordSets));
    ctx.graphicVariables =
      await registry.fromJSON<GraphicVariable[]>('graphicVariableMappings', 'default', data.graphicVariableMappings, ctx);
    ctx.graphicSymbols =
      await registry.fromJSONArray<GraphicSymbol>('graphicSymbolMappings', 'default', data.graphicSymbolMappings, ctx);
    ctx.visualizations = await registry.fromJSONArray<Visualization>('visualization', 'default', data.visualizations, ctx);
    return ctx;
  }

  async toJSON(instance: Project, _context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    instance.metadata.dateSaved = new Date();
    return {
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
  }
}
