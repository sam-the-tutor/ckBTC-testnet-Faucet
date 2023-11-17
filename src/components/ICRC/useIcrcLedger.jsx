import React, { useEffect, useState } from 'react'
import { IcrcLedgerCanister, IcrcIndexCanister } from '@dfinity/ledger-icrc'
import { useAuth } from '../../use-auth-client'
import { canisterId as ICLedgerID } from '../../declarations/icrc1_ledger_canister'
import { canisterId as ICIndexID } from '../../declarations/icrc1_index_canister'
import { createAgent } from '@dfinity/utils'
import { Principal } from '@dfinity/principal'
import { transformIcpData } from './functions'

const useIcrcLedger = () => {
  const { identity, principal, changes, agent } = useAuth()
  const [ICRCLegder, setICRCLedger] = useState(null)
  const [ICRCIndex, setICRCIndex] = useState(null)
  const [userBalance, setUserBalance] = useState(null)
  const [userTransactions, setUserTransactions] = useState(null)

  useEffect(() => {
    setUpCanisters()
  }, [identity, changes])

  async function setUpCanisters() {
    try {
      const ledgerActor = IcrcLedgerCanister.create({
        agent,
        canisterId: ICLedgerID,
      })

      const indexActor = IcrcIndexCanister.create({
        agent,
        canisterId: ICIndexID,
      })

      const balance = await ICRCLegder?.balance({
        certified: false,
        owner: principal,
      })

      setUserBalance(Number(balance) / 1e8)
      const trans = await indexActor?.getTransactions({
        max_results: 20,

        account: {
          owner: principal,
          subaccount: null,
        },
      })

      const formatedTrans = transformIcpData(trans.transactions)
      setICRCLedger(ledgerActor)
      setICRCIndex(indexActor)
      setUserTransactions(formatedTrans)
    } catch (error) {
      console.log('error in fetching user balance :', error)
    }
  }

  return { ICRCLegder, userBalance, userTransactions }
}

export default useIcrcLedger
