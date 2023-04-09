let batches = [];

const batchingAndRecording = async (array, batchSize, callBack, options) => {
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }

  for (const batch of batches) {
    await callBack(batch)
      .then(() => console.log("seccess batch"))
      .catch(() => console.log("error batch"));
    // this.saveDataEmployeesPosition(, optins);
  }

  batches = [];
};

module.exports = { batchingAndRecording };
