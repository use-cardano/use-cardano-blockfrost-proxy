import styles from "styles/home.module.css"
import * as UC from "use-cardano"

const options: UC.UseCardanoOptions = {
  node: {
    provider: "blockfrost-proxy",
    proxyUrl: "/api/blockfrost",
  },
}

const Content = () => {
  const { account } = UC.useCardano()

  return (
    <div className={styles.container}>
      <div className={styles.walletSelector}>
        <UC.CardanoWalletSelector />
      </div>

      <div>{account.address && <div>Connected to {account.address}</div>}</div>
    </div>
  )
}

const IndexPage = () => (
  <UC.CardanoProvider options={options}>
    <Content />

    <UC.CardanoToaster />
  </UC.CardanoProvider>
)

export default IndexPage
