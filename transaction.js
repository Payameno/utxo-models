class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
      this.inputUTXOs = inputUTXOs;
      this.outputUTXOs = outputUTXOs;
      this.fee = 0;
  }
  execute() {

      const txo = this.inputUTXOs.some(x => x.spent)
      if (txo) {
        throw new Error("Cannot include a TXO");
      }

      const totalInput = this.inputUTXOs.reduce((p, c) => {
        return p + c.amount;
      }, 0);

      const totalOutput = this.outputUTXOs.reduce((p, c) => {
        return p + c.amount;
      }, 0);

      if (totalInput < totalOutput) {
        throw new Error("Not enough balance to continue");
      }

      this.inputUTXOs.forEach(UTXO => UTXO.spend())

      this.fee = totalInput - totalOutput;
  }
}

module.exports = Transaction;