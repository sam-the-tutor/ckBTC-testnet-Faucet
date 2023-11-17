import React from 'react'
import { useAuth } from '../use-auth-client'

const Login = () => {
  const { login } = useAuth()
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-500 shadow-lg border">
      <div>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="flex text-6xl text-red-400">
            Test ckBTC Token Faucet
          </h1>
          <img
            height="50px"
            width="50px"
            src="https://cdn.discordapp.com/attachments/950584476658962473/1174985332710723635/ckbtc.png"
          />
          <p className="text-white">
            Claim your ckBTC test tokens to start developing on the Internet
            Computer
          </p>
          <button
            onClick={login}
            className="border p-2 rounded-lg text-white text-md shadow shadow-black mt-6 flex gap-2 justify-center items-center"
          >
            <img
              height="30px"
              width="30px"
              src="https://cdn.discordapp.com/attachments/950584476658962473/1174985332710723635/ckbtc.png"
            />
            LOGIN
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
