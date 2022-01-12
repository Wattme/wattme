import axios from "axios";

const get1inchTokens = async (chainId = 1) => {

  const response = await axios.get(`https://api.1inch.exchange/v3.0/${chainId}/tokens`).then((res) => {
    return res.data.tokens || {}
  }).catch(() => {
    return {}
  });


  const list = Object.keys(response).map((key) => {
    return {
      ...response[key],
      network: Boolean(chainId === 1) ? "ERC-20" : Boolean(chainId === 56) ? "BEP-20" : "POLYGON",
      code: response[key]?.symbol,
    }
  })


  return list
}

export {
  get1inchTokens
}
