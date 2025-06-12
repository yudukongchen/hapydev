export const FREQUENCY_OPTIONS = [
  { label: '手动触发', value: '1' },
  { label: '每隔5分钟', value: '2' },
  { label: '每隔10分钟', value: '3' },
  { label: '每隔30分钟', value: '4' },
  { label: '每隔3小时', value: '5' },
  { label: '每隔12小时', value: '6' },
  { label: '每隔24小时', value: '7' },
];

export const FREQUENCY_CRON_SETTINGS = {
  '1': null,
  '2': '0 */5 * * * ?',
  '3': '0 */10 * * * ?',
  '4': '0 */30 * * * ?',
  '5': '0 0 */3 * * ?',
  '6': '0 0 */12 * * ?',
  '7': '0 0 0 */1 * ?',
};
