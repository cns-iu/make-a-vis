import { RawData } from './../../shared/raw-data';
import { Visualization } from './../../shared/visualization';
import { GraphicSymbol } from './../../shared/graphic-symbol';
import { GraphicVariableMapping } from './../../shared/graphic-variable-mapping';
import { DataSource } from './../../shared/data-source';
import { Project } from '../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { RecordSet } from '../../shared/record-set';

export class DefaultProjectFactory implements ObjectFactory<Project, Project> {
  id = 'default';
  type = 'project';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Project> {
    // Make sure raw data is parsed first
    const rawData = await registry.fromJSONArray<RawData>('rawData', 'default', data.rawData, context);

    Object.assign(context, {
      metadata: data.metadata || {},
      rawData,
      dataSources: await registry.fromJSONArray<DataSource>('dataSource', 'default', data.dataSources, context),
      recordSets: await registry.fromJSONArray<RecordSet>('recordSet', 'default', data.recordSets, context),
      graphicVariableMappings:
        await registry.fromJSONArray<GraphicVariableMapping>('graphicVariableMapping', 'default', data.graphicVariableMappings, context),
      graphicSymbolMappings:
        await registry.fromJSONArray<GraphicSymbol>('graphicSymbol', 'default', data.graphicSymbolMappings, context),
      visualizations: await registry.fromJSONArray<Visualization>('visualization', 'default', data.visualizations, context)
    });

    return context;
  }

  async toJSON(instance: Project, context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    instance.metadata.dateSaved = new Date();
    const data: any = {
      metadata: instance.metadata,
      dataSources: await registry.toJSONArray<DataSource>('dataSource', 'default', instance.dataSources, instance),
      recordSets: await registry.toJSONArray<RecordSet>('recordSet', 'default', instance.recordSets, instance),
      graphicVariableMappings:
        await registry.toJSONArray<GraphicVariableMapping>('graphicVariableMapping', 'default', instance.graphicVariableMappings, instance),
      graphicSymbolMappings:
        await registry.toJSONArray<GraphicSymbol>('graphicSymbolMapping', 'default', instance.graphicSymbolMappings, instance),
      visualizations: await registry.toJSONArray<Visualization>('visualization', 'default', instance.visualizations, instance),
      rawData: await registry.toJSONArray<RawData>('rawData', 'default', instance.rawData, instance),
    };

    return data;
  }
}
