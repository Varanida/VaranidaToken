class Time {

  static increaseTime(duration) {
    return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [duration],
        id: 0,
      }, err1 => {
        if (err1) return reject(err1)
        web3.currentProvider.sendAsync({
          jsonrpc: '2.0',
          method: 'evm_mine',
          id: 0,
        }, (err2, res) => {
          return err2 ? reject(err2) : resolve(res)
        })
      })
    })
  }

}

module.exports = Time;
