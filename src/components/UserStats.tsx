// src/components/UserStats.tsx

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contractABI.json'; // ABI of the smart contract

const contractAddress = '0x33BC13F08307E3Bb23f3161D288692C7404D798f';

const UserStats: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [ownedPokeballs, setOwnedPokeballs] = useState<number | null>(null);
  const [yieldAmount, setYieldAmount] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchUserStats(contract, accounts[0]);
    };

    init();
  }, []);

  const fetchUserStats = async (contract: ethers.Contract, userAddress: string) => {
    const owned = await contract.pokeballsOwned(userAddress);
    const yieldAmt = await contract.claimedYield(userAddress);
    setOwnedPokeballs(owned.toNumber());
    setYieldAmount(ethers.utils.formatEther(yieldAmt));
  };

  return (
    <div className="user-stats">
      <h2 className="animated">Your Stats</h2>
      <p>Account: {account}</p>
      <p>Owned Pokéballs: {ownedPokeballs}</p>
      <p>Your Yield Amount: {yieldAmount} PLS</p>
    </div>
  );
};

export default UserStats;
