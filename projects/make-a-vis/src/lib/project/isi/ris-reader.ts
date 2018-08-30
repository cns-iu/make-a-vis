export interface Tag {
  endrecord?: boolean;
  ignored?: boolean;
  list?: boolean;
  number?: boolean;
  string?: boolean;
  remap?: string;
  separator?: string;
}

export interface TagMapping {
  [id: string]: Tag;
}

export const DEFAULT_TAGS: TagMapping = {
  'FN': { ignored: true },
  'VR': { ignored: true },
  'AU': { list: true },
  'AB': { string: true, separator: ' ' },
  'PT': { string: true, separator: ' ' },
  'IS': { number: true },
  'ER': { endrecord: true },
  // 'default': { string: true, separator: ' ' },
  'default': { list: true }
};

const LINE_PATTERN = new RegExp(/^([A-Z ][A-Z0-9 ]) *\-* *(.*)$/);
function parseRISString(data: string): any {
  return data.split(/[\r\n]+/).map((s) => s.match(LINE_PATTERN)).filter(s => !!s).map(s => s.slice(1));
}
export function parseRISRecords(data: string, tagDefinitions: TagMapping = DEFAULT_TAGS): any[] {
  const records: any[] = [];
  let record: any = {}, lastTag = null, lastField = null;
  for (const [tag, value] of parseRISString(data)) {
    let flags = tagDefinitions[tag] || tagDefinitions['default'] || { ignored: true };
    if (flags.ignored) {
      continue;
    } else if (flags.endrecord) {
      records.push(record);
      record = {};
      lastTag = null;
    } else if (tag === '  ') {
      flags = tagDefinitions[lastTag] || tagDefinitions['default'];
      if (!lastTag) {
        // do nothing
      } else if (flags.list) {
        record[lastField].push(value);
      } else if (flags.string) {
        record[lastField] += (tag.separator || ' ') + value;
      } else {
        record[lastField] = value;
      }
    } else {
      lastTag = tag;
      lastField = flags.remap ? flags.remap : tag;
      if (flags.list) {
        record[lastField] = [value];
      } else if (record.hasOwnProperty(lastField)) {
        throw new Error(`Duplicate tag found: ${lastField}, Old Value: ${record[lastField]}, New Value: ${value}`);
      } else {
        record[lastField] = value;
      }
    }
  }
  return records;
}
