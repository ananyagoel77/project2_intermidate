import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SimpleContractABI from './SimpleContractABI.json'; // Replace with your ABI file path

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Connect to local or provider

const contractAddress = '0x123456789...'; // Replace with your deployed contract address
const simpleContract = new web3.eth.Contract(SimpleContractABI, contractAddress);

function ContractInteraction() {
    const [storedValue, setStoredValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await simpleContract.methods.get().call();
            setStoredValue(result);
        };
        fetchData();
    }, []);

    const setValue = async (newValue) => {
        await simpleContract.methods.set(newValue).send({ from: web3.eth.defaultAccount });
        const updatedValue = await simpleContract.methods.get().call();
        setStoredValue(updatedValue);
    };

    return (
        <div>
            <h2>Simple Contract Interaction</h2>
            <p>Stored Value: {storedValue}</p>
            <input
                type="number"
                value={storedValue}
                onChange={(e) => setStoredValue(parseInt(e.target.value))}
            />
            <button onClick={() => setValue(storedValue)}>Set Value</button>
        </div>
    );
}

export default ContractInteraction;
