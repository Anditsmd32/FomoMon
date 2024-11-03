// src/components/Home.tsx

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contractABI.json'; // ABI of the smart contract

const contractAddress = '0x33BC13F08307E3Bb23f3161D288692C7404D798f';

const Home: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [pokeballPrice, setPokeballPrice] = useState<number | null>(null);
  const [jackpot, setJackpot] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setProvider(provider);
      setContract(contract);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      fetchGameState(contract);
    };

    init();
  }, []);

  const fetchGameState = async (contract: ethers.Contract) => {
    const price = await contract.pokeballPrice();
    const jack = await contract.jackpot();
    setPokeballPrice(ethers.utils.formatEther(price));
    setJackpot(ethers.utils.formatEther(jack));
  };

  const buyPokeball = async () => {
    if (contract && account) {
      const tx = await contract.buyPokeball(account);
      await tx.wait();
      fetchGameState(contract);
      alert("Pokéball Purchased!");
    }
  };

  return (
    <div className="home">
      <h2 className="animated">Pokéball Price: {pokeballPrice} PLS</h2>
      <h2 className="animated">Jackpot: {jackpot} PLS</h2>
      <button className="animated" onClick={buyPokeball}>Buy Pokéball</button>
      <div className="footer">
        <p>Catch your favorite Pokémon and win big!</p>
      </div>
    </div>
  );
};

export default Home;
