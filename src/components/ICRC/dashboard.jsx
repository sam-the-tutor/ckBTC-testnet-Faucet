import React, { useEffect, useState } from 'react'
import useIcrcLedger from './useIcrcLedger'
import { useAuth } from '../../use-auth-client'
import { Principal } from '@dfinity/principal'
import { TransactionTable } from './functions'

const Dashboard = () => {
  const { ICRCLegder, userBalance, userTransactions } = useIcrcLedger()
  const { logout, principal, backendActor, setChanges } = useAuth()
  const [formData, setData] = useState({
    principal_id: '',
    transfer_amount: '',
  })

  //allow the user to claim some testnet ckBTC tokens
  async function claimTokens() {
    try {
      // await getBalance()
      //call the backend actor
      const results = await backendActor.claimTokens(principal)
      if (results.ok) {
        alert('claim successful')
      } else {
        console.log(results)
        alert('claim has failed')
      }
    } catch (error) {
      console.log('error in claiming tokens :', error)
    }
    setChanges(Math.random())
  }

  //transfer the tokens to another user
  async function transferTokens() {
    try {
      if (formData.principal_id && formData.transfer_amount) {
        const transferResults = await ICRCLegder?.transfer({
          to: {
            owner: Principal.fromText(formData.principal_id),
            subaccount: [],
          },
          fee: 10000,
          memo: [],

          from_subaccount: undefined,
          created_at_time: undefined,
          amount: Number(formData.transfer_amount) * 1e8,
        })
      }
    } catch (error) {
      console.log('error :', error)
    }

    setChanges(Math.random())
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="flex flex-col h-full w-full justify-center bg-slate-500 shadow-lg border">
      <div className="text-white">
        <h2 className="text-4xl">Principal ID</h2>
        <span>{principal.toString()}</span>
      </div>
      <div className="flex gap-4 justify-center mt-20">
        {/* left side f0r the claim */}
        <div className="flex flex-col gap-16 border border-white shadow-md p-4 shadow-black">
          <button
            onClick={() => claimTokens()}
            className="border flex gap-1 items-center justify-center text-white p-2 rounded-lg text-md shadow shadow-black mt-6 "
          >
            Claim
            <img
              height="20px"
              width="20px"
              src="https://cdn.discordapp.com/attachments/950584476658962473/1174985332710723635/ckbtc.png"
            />
          </button>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="enter principal id"
              className="rounded-md"
              name="principal_id"
              id="principal_id"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              name="transfer_amount"
              id="transfer_amount"
              onChange={handleChange}
              className="rounded-md"
              required
              placeholder="enter amount to trasfer"
            />
            <button
              onClick={() => transferTokens()}
              className="border flex gap-1 items-center justify-center text-white p-2 rounded-lg text-sm shadow shadow-black"
            >
              Transfer
              <img
                height="20px"
                width="20px"
                src="https://cdn.discordapp.com/attachments/950584476658962473/1174985332710723635/ckbtc.png"
              />
            </button>
          </div>
        </div>
        {/* right side for the transactions */}
        <div className="flex flex-col gap-2 border border-white shadow-md p-4 shadow-black w-2/4">
          <div className="flex justify-between">
            <div className="text-white">
              Balance :{' '}
              {!userBalance ? (
                <span>0 tckBTC</span>
              ) : (
                <span>{userBalance} tckBTC</span>
              )}
            </div>
            <button
              onClick={logout}
              className="border p-2 rounded-lg bg-red-300 text-sm shadow shadow-black"
            >
              Logout
            </button>
          </div>
          {/* div to include the table for the transactions */}
          <div>
            <TransactionTable transactions={userTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
