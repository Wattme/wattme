import { store } from "../store/store";

const baseWallet = {
  key: "", // Ключ кошелька
  label: "", // Заголовок кошелька
  list: [], // Список адресов или адреса
  type: "", // MULTI || SINGLE
  category: "", // MULTI || BNB || ETH
  image: null, // Картинка кошелька (base64)
};

const getWalletsList = async ({ walletName, walletLabel, walletList, walletImage, walletType, walletCategory }) => {
  const { globalState } = store.getState();
  const { walletsList } = globalState;

  // При создании кошелька мы генерируем ключ для кошелька
  if (!walletName) {
    walletName = `WATT-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
  }

  // Создание или изменение кошелка
  let wallet = walletsList[walletName] || {...baseWallet};
  wallet.key = walletName || wallet.key;
  wallet.list = walletList || wallet.list;
  wallet.label = walletLabel || wallet.label;
  wallet.type = walletType || wallet.type;
  wallet.category = walletCategory || wallet.category;
  wallet.image = walletImage || wallet.image;

  // Добавление нового или отредактированного кошелька в список кошельков приложения
  let newWalletsList = {...walletsList};
  newWalletsList[walletName] = wallet;

  return {
    walletsList: newWalletsList,
    wallet: wallet
  }
};

export {
  getWalletsList,
};
