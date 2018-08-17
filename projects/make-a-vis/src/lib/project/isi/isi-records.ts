const TAGS = {
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
function parseISIString(data: string): any {
  return data.split(/[\r\n]+/).map((s) => s.match(LINE_PATTERN)).filter(s => !!s).map(s => s.slice(1));
}

function RISRecords(data: string, tagDefinitions = TAGS): any[] {
  const records: any[] = [];
  let record: any = {}, lastTag = null;
  for (const [tag, value] of parseISIString(data)) {
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
        record[lastTag].push(value);
      } else if (flags.string) {
        record[lastTag] += (tag.separator || ' ') + value;
      } else {
        record[lastTag] = value;
      }
    } else {
      lastTag = tag;
      if (flags.list) {
        record[tag] = [value];
      } else if (record.hasOwnProperty(tag)) {
        throw new Error(`Duplicate tag found: ${tag}, Old Value: ${record[tag]}, New Value: ${value}`);
      } else {
        record[tag] = value;
      }
    }
  }
  return records;
}
