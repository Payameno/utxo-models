class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
      this.inputUTXOs = inputUTXOs;
      this.outputUTXOs = outputUTXOs;
  }
  execute() {
      const txo = this.inputUTXOs.some(x => x.spent)
      if (txo) {
        throw new Error("Cannot include a TXO");
      }
  }
}

module.exports = Transaction;