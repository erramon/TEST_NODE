export function getJSONConfig(): any {
  const env = process.env.NODE_ENV || 'dev';
  return require(`../config/${env}.json`);
}
