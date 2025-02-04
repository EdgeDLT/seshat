import fs from "fs"
import fetch from "node-fetch"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let contracts = {
    mainnet: [],
    testnet: []
}

let nativeContracts = [{"hash":"0xfe924b7cfe89ddd271abaf7210a80a7e11178758","manifest":{"name":"OracleContract","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0x49cf4e5378ffcd4dec034fd98a174c5491e395e2","manifest":{"name":"RoleManagement","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xcc5e4edd9f5f8dba8bb65734541df7a1c081c67b","manifest":{"name":"PolicyContract","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xd2a4cff31913016155e38e474a2c06d08be276cf","manifest":{"name":"GasToken","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5","manifest":{"name":"NeoToken","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xda65b600f7124ce6c79950c1772a36403104f2be","manifest":{"name":"LedgerContract","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0x726cb6e0cd8628a1350a611384688911ab75f51b","manifest":{"name":"CryptoLib","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xacce6fd80d44e1796aa0c2c625e9e4e0ce39efc0","manifest":{"name":"StdLib","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"},{"hash":"0xfffdc93764dbaddd97c48f252a53ea4643faa3fd","manifest":{"name":"ContractManagement","extra":null},"block":1,"time":"","asset_name":"","symbol":"","type":"native"}]

console.log("Fetching contracts..")
const mainnetContracts = await fetchContracts("mainnet")
const testnetContracts = await fetchContracts("testnet")

contracts.mainnet = [...new Set(mainnetContracts)] // Prevent duplicate entries
contracts.testnet = [...new Set(testnetContracts)]

console.log("Writing to file..")
fs.writeFileSync("./data/contracts.json", JSON.stringify(contracts))

async function fetchContracts(network) {
    let contracts = []

    nativeContracts.forEach(el => {
        contracts.push(el)
    })

    const res = await fetch(
        `https://dora.coz.io/api/v2/neo3/${network}/contracts/*`
    )
    const data = await res.json()
    return contracts.concat(data.items)
}
