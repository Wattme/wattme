import {store} from '../store/store';

const chartsGetTotalInformation = () => {
    const {globalState} = store.getState();
    const {currencies} = globalState;
    
    let marketCapUsd = 0;
    let volumeUsd24hr = 0;
    
    currencies.map((currency) => {
        marketCapUsd = marketCapUsd + Number.parseFloat(currency.market_cap_usd);
        volumeUsd24hr = volumeUsd24hr + Number.parseFloat(currency.volume_usd_24hr);
    });
    
    return {
        marketCapUsd,
        volumeUsd24hr
    }
}

export {
    chartsGetTotalInformation
}
