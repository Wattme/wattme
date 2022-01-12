import React from "react";
import "./styles.css";
import {Notification} from "../../../../../common/Notification";

class BuyToken extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};

        this.addressContract = "0x819D10fa9F629FF54c5bc910F9772073f5FEFb61";
    }

    copyAddress = async () => {

        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';

                Notification({
                    type: "success",
                    message: "Адрес скопирован"
                })

            } catch (err) {
                Notification({
                    type: "success",
                    message: "Ошибка копирования адреса"
                })
            }

            document.body.removeChild(textArea);
        }
        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function() {
                Notification({
                    type: "success",
                    message: "Адрес скопирован"
                })
            }, function(err) {
                Notification({
                    type: "success",
                    message: "Ошибка копирования адреса"
                })
            });
        }

        copyTextToClipboard(this.addressContract);

    }

    render() {
        return (
            <div className="watt-buy">

                <div className="watt-buy__title">Покупка токен WATT</div>

                <div className="watt-buy__qrcode">
                    <div className="watt-buy__qrcode-container">
                        <img src={require("./image_2021-12-11_10-47-52.png").default} className="watt-buy__qrcode-image"/>
                        <div className="watt-buy__qrcode-address">{this.addressContract}</div>
                    </div>
                </div>

                <div className="watt-buy__message">
                    Для получения WATT<br/>
                    достаточно отправить BUSD на адрес:
                </div>

                <div className="watt-buy__message">
                    { this.addressContract }
                </div>

                <div className="watt-buy__button-copy" onClick={this.copyAddress}>
                    Скопировать
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.25 4.375V4.375C12.25 3.08935 12.25 2.44653 11.9655 1.97179C11.7964 1.68969 11.5603 1.45363 11.2782 1.28454C10.8035 1 10.1606 1 8.875 1H5C3.11438 1 2.17157 1 1.58579 1.58579C1 2.17157 1 3.11438 1 5V8.875C1 10.1606 1 10.8035 1.28454 11.2782C1.45363 11.5603 1.68969 11.7964 1.97179 11.9655C2.44653 12.25 3.08935 12.25 4.375 12.25V12.25" stroke="#282828" stroke-width="2"/>
                        <rect x="7.75" y="7.75" width="11.25" height="11.25" rx="2" stroke="#282828" stroke-width="2"/>
                    </svg>
                </div>

            </div>
        )
    }
}

export default BuyToken
