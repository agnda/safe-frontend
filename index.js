import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [eligible, setEligible] = useState(false);
  const [claimable, setClaimable] = useState(0);

  useEffect(() => {
    if ('solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        provider.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
          setWallet(publicKey);
        });
      }
    }
  }, []);

  const connectWallet = async () => {
    const { publicKey } = await window.solana.connect();
    setWallet(publicKey);
  };

  useEffect(() => {
    if (!wallet) return;
    setBalance("123,456 SAFE");
    setEligible(true);
    setClaimable(0.042);
  }, [wallet]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Solana Safe State</title>
        <meta name="description" content="Hold SAFE. Earn SOL." />
      </Head>
      <main className="p-10 text-center">
        <img src="/A_2D_digital_illustration_features_a_safe_specific.png" alt="SAFE Logo" className="mx-auto w-40 mb-6 rounded" />
        <h1 className="text-4xl font-bold mb-4">Hold SAFE. Stay Eligible. Earn SOL.</h1>
        {!wallet ? (
          <button className="bg-green-600 px-4 py-2 rounded" onClick={connectWallet}>Connect Wallet</button>
        ) : (
          <div>
            <p><strong>Wallet:</strong> {wallet.toString()}</p>
            <p><strong>Balance:</strong> {balance}</p>
            <p><strong>Status:</strong> {eligible ? 'Eligible ✅' : 'Not eligible ❌'}</p>
            <p><strong>Claimable SOL:</strong> {claimable} SOL</p>
          </div>
        )}
      </main>
    </div>
  );
}
