import styles from "./ConnectButton.module.css"
import { useAppKit } from '@reown/appkit/react'
import { useAppKitNetwork } from "@reown/appkit/react"
import { useAppKitAccount } from "@reown/appkit/react"
import * as icons from "../../icons.json"

export default function ConnectButton() {
  const { open } = useAppKit()
  const { chainId } = useAppKitNetwork()
  const { address, isConnected } = useAppKitAccount()

  function renderNetwork() : string {
    if (chainId == 1) {
      return "Ethereum"
    } else {
      return "Sepolia"
    }
  }

  function renderIcon() : string {
    if (chainId == 1) {
      return icons.ethereum
    } else if (chainId == 42161){
      return icons.arbitrum
    } else {
      return icons.ethereum 
    }
  }

  function renderAccount() : string {
    if(isConnected) {
      return shortenAddress(address as string)
    } else {
      return "Connect Wallet"
    }
  }

  function shortenAddress(addressStr : string) : string {
    return addressStr.slice(0, 4) + "..." + addressStr.slice(-4);
  }

  return (
    <div className={styles["connect"]}>
      <button className={styles["network-button"]} onClick={() => open({ view: 'Networks' })}>
        <div className={styles["icon"]}>
          <img src={renderIcon()} alt="Chain Icon" />
        </div>
        <div className={styles["network-name"]}>{renderNetwork()}</div>
      </button>
      <button className={styles["connect-button"]} onClick={() => open()}>{renderAccount()}</button>
    </div>
  )
}