// import { JSONSchemaFaker } from 'json-schema-faker';
import { isPlainObject } from 'lodash';
import { mock } from 'mock-json-schema';

export const mockSchema = (schema) => {
  if (!isPlainObject(schema)) {
    return null;
  }
  const result = mock(schema);
  console.log({
    schema,
    result,
  });
  return result;
  //  return JSONSchemaFaker.generate(schema);
};
