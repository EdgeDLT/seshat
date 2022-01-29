import fs from "fs"
import fetch from "node-fetch"

let contracts = {
    mainnet: [],
    testnet: []
}

console.log("Fetching contracts..")
const mainnetContracts = await fetchContracts("mainnet")
const testnetContracts = await fetchContracts("testnet_rc4")

contracts.mainnet = [...new Set(mainnetContracts)] // Prevent duplicate entries
contracts.testnet = [...new Set(testnetContracts)]

console.log("Writing to file..")
fs.writeFileSync("./data/contracts.json", JSON.stringify(contracts))

async function fetchContracts(network) {
    let i
    let contracts = []

    const res = await fetch(
        `https://dora.coz.io/api/v1/neo3/${network}/contracts/0`
    )
    const data = await res.json()
    const pages = Math.round(data.totalCount / 15) // 15 entries per page

    data.items.forEach((el) => contracts.push(el))

    for (i = 1; i < pages; i++) {
        const r = await fetch(
            `https://dora.coz.io/api/v1/neo3/${network}/contracts/${i}`
        )
        const d = await r.json()

        d.items.forEach((el) => contracts.push(el))
    }
    return contracts
}
