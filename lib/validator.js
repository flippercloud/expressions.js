import Ajv from 'ajv/dist/2020'
import addFormats from 'ajv-formats'
import schema from './schema.json'

export default function (options = { allErrors: true, verbose: true }) {
  const ajv = new Ajv()
  addFormats(ajv)
  return ajv.compile(schema)
}
