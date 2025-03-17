import styles from "./Home.module.css"
import { useEffect, useState } from "react"
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react"
import { BrowserProvider, Eip1193Provider } from 'ethers'
import { Storage__factory, Storage } from "../../types"
import * as config from "../../contracts/config.json"

export function Home() {
    const { isConnected } = useAppKitAccount()
    const { walletProvider } = useAppKitProvider('eip155')
    const [contract, setContract] = useState<Storage | null>(null)
    const [storedNumber, setStoredNumber] = useState<bigint | null>(null)
    const [number, setNumber] = useState<bigint>(0n)

    const retrieve = async () => {
        if (!contract) {
            console.error("Contract is not initialized")
            return
        }

        try {
            const number = await contract.retrieve()
            setStoredNumber(number);
        } catch (error) {
            console.error("Error: ", error)
        }
    };
    

    const store = async (e : any) => {
        e.preventDefault()

        if (!contract) {
            console.error("Contract is not initialized")
            return
        }

        try {
            const tx = await contract.store(number)
            await tx.wait()
            await retrieve()
        } catch (error) {
            console.error("Error: ", error)
        }
    }
  
    useEffect(() => {
        const loadContract = async () => {
            const provider = new BrowserProvider(walletProvider as Eip1193Provider)
            const signer = await provider.getSigner()

            const address = config.networks.sepolia.address
            const storageContract = Storage__factory.connect(address, signer)

            setContract(storageContract)
        }

        if(isConnected) {
            loadContract()
        }
    }, [walletProvider])

    useEffect(() => {
        if(contract) {
            retrieve()
        }
    }, [contract])

    return (
        <div className={styles["home"]}>
            <div className={styles["container"]}>
                {
                    isConnected ? <>
                        <div className={styles["retrieve-block"]}>
                            <div className={styles["retrieve-number"]}>{storedNumber == null ? "Loading..." : `Number: ${storedNumber.toString()}`}</div>
                            <button className={styles["retrieve-button"]} onClick={retrieve}>Retrieve</button>
                        </div>
                        <form className={styles["store-form"]}>
                            <input onChange={(e) => setNumber(BigInt(e.target.value))} className={styles["store-input"]} type="number" name="store-input" id="store-input" />
                            <button className={styles["store-button"]} onClick={store}>Store</button>
                        </form>
                    </> : 
                    <div className={styles["connect-message"]}>Pleaes, connect your wallet</div>
                }
            </div>
        </div>
    )
}