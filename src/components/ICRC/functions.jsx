import React from 'react'
export function shortenString(str) {
  if (str.length <= 11) {
    return str
  } else {
    let firstPart = str.substring(0, 5)
    let lastPart = str.substring(str.length - 3)
    return `${firstPart}...${lastPart}`
  }
}

export function unixToDate(unixTimestamp) {
  // Convert nanoseconds to seconds
  var unixTimestampSeconds = unixTimestamp / 1000000000

  // Convert Unix timestamp to JavaScript time
  var date = new Date(unixTimestampSeconds * 1000)

  // Extract date and time
  var dateString = date.toLocaleDateString('en-US')
  var timeString = date.toLocaleTimeString('en-US')
  return dateString + ' ' + timeString
}

export function transformIcpData(dataArray) {
  var userTransactions = []
  for (const data of dataArray) {
    const { transaction } = data
    console.log(transaction)

    var transKind
    var transAmount
    var transFrom
    var transTo
    var timeStamp
    if (transaction?.kind === 'approve') {
      transKind = 'Approve'
      transAmount = transaction.approve[0].amount
      transFrom = transaction.approve[0].from.owner.toString()
      transTo = transaction.approve[0].spender.owner.toString()
      timeStamp = transaction.timestamp
    } else if (transaction?.kind === 'mint') {
      transKind = 'Mint'
      transAmount = transaction.mint[0].amount
      transFrom = 'minting account'
      transTo = transaction?.mint[0].to.owner.toString()
      timeStamp = transaction.timestamp
    } else if (transaction?.kind === 'burn') {
      transKind = 'Burn'
      transAmount = transaction.burn[0].amount
      transTo = 'minting account'
      transFrom = transaction.burn[0].from.owner.toString()
      timeStamp = transaction.timestamp
    } else if (transaction?.kind === 'transfer') {
      transKind = 'Transfer'
      transAmount = transaction.transfer[0].amount
      transTo = transaction.transfer[0].to.owner.toString()
      transFrom = transaction.transfer[0].from.owner.toString()
      timeStamp = transaction.timestamp
    }
    userTransactions.push({
      kind: transKind,
      amount: Number(transAmount) / 1e8,
      from: transFrom,
      to: transTo,
      timestamp: timeStamp,
    })
  }

  return userTransactions
}

export const TransactionTable = ({ transactions }) => {
  console.log(transactions)
  return (
    <>
      {transactions?.length > 0 ? (
        <div className=" overflow-x-auto h-64">
          <table className="block w-full text-md text-center  dark:text-gray-400 table-fixed">
            <thead>
              <tr className="text-white bg-slate-400">
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">Kind</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">To</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll h-32">
              {transactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-800 even:bg-red-300 odd:bg-white"
                >
                  <td className="px-6 py-4 w-3">
                    <div className="flex gap-1">
                      <img
                        height="20px"
                        width="20px"
                        src="https://cdn.discordapp.com/attachments/950584476658962473/1174985332710723635/ckbtc.png"
                      />
                      {transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 w-4">
                    {shortenString(transaction.from)}
                  </td>
                  <td className="px-6 py-4 ">{transaction.kind}</td>
                  <td className="px-6 py-4 ">
                    {unixToDate(Number(transaction.timestamp))}
                  </td>
                  <td className="px-6 py-4">{shortenString(transaction.to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-white bg-red-300">
          No transaction history for this user
        </div>
      )}
    </>
  )
}
