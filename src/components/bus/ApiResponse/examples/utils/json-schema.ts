import Type from 'type-of-is';

const DRAFT = 'http://json-schema.org/draft-04/schema#';

function getPropertyFormat(value) {
  const type = Type.string(value).toLowerCase();

  if (type === 'date') return 'date-time';

  return null;
}

function getPropertyType(value) {
  const type = Type.string(value).toLowerCase();

  if (type === 'number') return Number.isInteger(value) ? 'integer' : type;
  if (type === 'date') return 'string';
  if (type === 'regexp') return 'string';
  if (type === 'function') return 'string';

  return type;
}

function getUniqueKeys(a, b, c) {
  a = Object.keys(a);
  b = Object.keys(b);
  c = c || [];

  let value;
  let cIndex;
  let aIndex;

  for (let keyIndex = 0, keyLength = b.length; keyIndex < keyLength; keyIndex++) {
    value = b[keyIndex];
    aIndex = a.indexOf(value);
    cIndex = c.indexOf(value);

    if (aIndex === -1) {
      if (cIndex !== -1) {
        c.splice(cIndex, 1);
      }
    } else if (cIndex === -1) {
      c.push(value);
    }
  }

  return c;
}

function processArray(array, output?: any, nested?: any) {
  let format;
  let oneOf;
  let type;

  if (nested && output) {
    output = { items: output };
  } else {
    output = output || {};
    output.type = getPropertyType(array);
    output.items = output.items || {};
    type = output.items.type || null;
  }

  // Determine whether each item is different
  for (let arrIndex = 0, arrLength = array.length; arrIndex < arrLength; arrIndex++) {
    const elementType = getPropertyType(array[arrIndex]);
    const elementFormat = getPropertyFormat(array[arrIndex]);

    if (type && elementType !== type) {
      output.items.oneOf = [];
      oneOf = true;
      break;
    } else {
      type = elementType;
      format = elementFormat;
    }
  }

  if (!oneOf && type) {
    output.items.type = type;
    if (format) {
      output.items.format = format;
    }
  } else if (oneOf && type !== 'object') {
    output.items = {
      oneOf: [{ type }],
      required: output.items.required,
    };
  }

  if (typeof output.items.oneOf !== 'undefined' || type === 'object') {
    for (let itemIndex = 0, itemLength = array.length; itemIndex < itemLength; itemIndex++) {
      const value = array[itemIndex];
      const itemType = getPropertyType(value);
      const itemFormat = getPropertyFormat(value);
      var arrayItem;
      if (itemType === 'object') {
        if (output.items.properties) {
          output.items.required = getUniqueKeys(
            output.items.properties,
            value,
            output.items.required
          );
        }
        arrayItem = processObject(value, oneOf ? {} : output.items.properties, true);
      } else if (itemType === 'array') {
        arrayItem = processArray(value, oneOf ? {} : output.items.properties, true);
      } else {
        arrayItem = {};
        arrayItem.type = itemType;
        if (itemFormat) {
          arrayItem.format = itemFormat;
        }
      }
      if (oneOf) {
        const childType = Type.string(value).toLowerCase();
        const tempObj = {};
        if (!arrayItem.type && childType === 'object') {
          tempObj.properties = arrayItem;
          tempObj.type = 'object';
          arrayItem = tempObj;
        }
        output.items.oneOf.push(arrayItem);
      } else {
        if (output.items.type !== 'object') {
          continue;
        }
        output.items.properties = arrayItem;
      }
    }
  }
  return nested ? output.items : output;
}

function processObject(object, output?: any, nested?: any) {
  if (nested && output) {
    output = { properties: output };
  } else {
    output = output || {};
    output.type = getPropertyType(object);
    output.properties = output.properties || {};
    output.required = Object.keys(object);
  }

  for (const key in object) {
    const value = object[key];
    let type = getPropertyType(value);
    const format = getPropertyFormat(value);

    type = type === 'undefined' ? 'null' : type;

    if (type === 'object') {
      output.properties[key] = processObject(value, output.properties[key]);
      continue;
    }

    if (type === 'array') {
      output.properties[key] = processArray(value, output.properties[key]);
      continue;
    }

    if (output.properties[key]) {
      const entry = output.properties[key];
      const hasTypeArray = Array.isArray(entry.type);

      if (hasTypeArray && entry.type.indexOf(type) < 0) {
        entry.type.push(type);
      }

      if (!hasTypeArray && entry.type !== type) {
        entry.type = [entry.type, type];
      }

      continue;
    }

    output.properties[key] = {};
    output.properties[key].type = type;

    if (format) {
      output.properties[key].format = format;
    }
  }

  return nested ? output.properties : output;
}

function jsonToSchema(title, object?: any) {
  let processOutput;
  const output: any = {
    $schema: DRAFT,
  };

  if (typeof title !== 'string') {
    object = title;
    title = undefined;
  } else {
    output.title = title;
  }
  output.type = Type.string(object).toLowerCase();
  if (output.type === 'object') {
    processOutput = processObject(object);
    output.type = processOutput.type;
    output.properties = processOutput.properties;
    output.required = Object.keys(object).filter(function (key) {
      return !key.startsWith('$');
    });
  }
  if (output.type === 'array') {
    processOutput = processArray(object);
    output.type = processOutput.type;
    output.items = processOutput.items;

    if (output.title) {
      output.items.title = output.title;
      output.title += ' Set';
    }
  }

  // Output
  return output;
}

export default jsonToSchema;
