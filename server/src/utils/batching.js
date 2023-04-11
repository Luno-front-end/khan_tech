let batches = [];

const batchingAndRecording = async (array, batchSize, callBack, options) => {
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    await callBack(batch);
  }

  batches = [];
};

module.exports = { batchingAndRecording };
