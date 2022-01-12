const getQrCodeUrl = ({ data, size }) => {

  if (!size) {
    size = 300;
  }

  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`
}

export {
  getQrCodeUrl
}
