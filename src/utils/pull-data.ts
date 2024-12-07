export const getPullBuffers = (unLoads: string[]) => {
  const download_buffer_size = parseInt(import.meta.env.VITE_DOWNLOAD_BUFFER_SIZE);
  const targetIdList = unLoads;
  const tasks = Math.ceil(targetIdList?.length / download_buffer_size);
  const pullBuffers = [];
  for (let i = 0; i < tasks; i++) {
    const targetIds = targetIdList.slice(i * download_buffer_size, (i + 1) * download_buffer_size);
    pullBuffers.push(targetIds);
  }
  return pullBuffers;
};
