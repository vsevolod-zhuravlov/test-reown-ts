Reown + Typechain + Ethers + React

---

## Installation

### 1. Install Reown and Ethers

First, install the necessary packages for **Reown** and **Ethers**:

```bash
npm install @reown/appkit @reown/appkit-adapter-ethers ethers
```

### 2. Install Typechain

Next, install **Typechain** and the **ethers-v6** adapter:

```bash
npm install --save-dev typechain @typechain/ethers-v6
```

### 3. Generate Types

After installing Typechain, generate types for your smart contracts by running the following command:

```bash
npx typechain --target=ethers-v6 --out-dir=src/types "src/contracts/abis/storage.json"
```

- `--target=ethers-v6`: specifies the adapter for **ethers-v6**.
- `--out-dir=src/types`: specifies the output directory for the generated types.
- `"src/contracts/abis/storage.json"`: path to your contract's ABI file.

Now, the types for your contracts will be generated in the `src/types` folder.

---
