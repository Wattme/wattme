import currency from "./currency";
import networks from "./networks";

export default [
	
	{
		code: currency.bnb_code,
		chainId: 56,
		provider: networks.binance.provider
	},
	
	{
		code: currency.eth_code,
		chainId: 1,
		provider: networks.ethereum.provider
	},
	
	{
		code: currency.matic_code,
		chainId: 137,
		provider: networks.matic.provider
	},
	
]