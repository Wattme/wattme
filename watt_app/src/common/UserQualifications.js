import { store } from "../store/store";

const imageUserQualifications = (initLevel) => {
  const { wiseWinState } = store.getState();
  const wiseWinProfileEnergy = wiseWinState?.profile?.energy_rank || 0;

  const level = initLevel || wiseWinProfileEnergy || 0;

  if (level === 1) {
    return require("../assets/png/qualifications/no-qualifications.png");
  }
  if (level === 2) {
    return require("../assets/png/qualifications/spark.png");
  }
  if (level === 3) {
    return require("../assets/png/qualifications/flash.png");
  }
  if (level === 4) {
    return require("../assets/png/qualifications/power.png");
  }
  if (level === 5) {
    return require("../assets/png/qualifications/storm.png");
  }
  if (level === 6) {
    return require("../assets/png/qualifications/tesla.png");
  }
  if (level === 7) {
    return require("../assets/png/qualifications/alfa.png");
  }
}

export {
  imageUserQualifications
}
