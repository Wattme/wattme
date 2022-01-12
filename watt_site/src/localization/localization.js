export default {
    landing: {
        banner: {
            title: "landing.banner.title",
            caption: "landing.banner.caption",
            message: "landing.banner.message",
            li1: "landing.banner.li1",
            li2: "landing.banner.li2",
            li3: "landing.banner.li3",
            li4: "landing.banner.li4",
        },
        dashboard: {
            title: "landing.dashboard.title",
            message1: "landing.dashboard.message1",
            message2: "landing.dashboard.message2",
        },
        wallet: {
            title: "landing.wallet.title",
            message1: "landing.wallet.message1",
            message2: "landing.wallet.message2",
            message3: "landing.wallet.message3",
        },
        nftCollection: {
            title: "landing.nftCollection.title",
            message: "landing.nftCollection.message",
        },
        buyingCrypto: {
            title: "landing.buyingCrypto.title",
            message: "landing.buyingCrypto.message",
        },
        smartTrading: {
            title: "landing.smartTrading.title",
            message1: "landing.smartTrading.message1",
            message2: "landing.smartTrading.message2",
        },
        wattMe: {
            title: "landing.wattMe.title",
            li1: "landing.wattMe.li1",
            li2: "landing.wattMe.li2",
            whitePaper: "landing.wattMe.whitePaper",

            downloadTitle: "landing.wattMe.downloadTitle",
        }
    },
    userAgreement: {
        title: "userAgreement.title",
        message: "userAgreement.message",
    },
    privacyPolicy: {
        title: "Политика конфиденциальности",
        message: "Пользовательское соглашение определяет права и обязанности владельцев сайтов, мобильных приложений и их пользователей при взаимодействии в Интернете.<br/>Соглашение имеет два вида целей: заявленные и реальные. <br/>К заявленным целям относятся намерение бизнеса рассказать о возможностях продукта, описать порядок работы с клиентами и дать исчерпывающие представления о средствах юридической защиты. Реальные цели более прагматичны – компаниям необходимо ограничить ответственность и защитить интеллектуальную собственность.<br/>С юридической точки зрения пользовательское соглашение является смешанной, непоименованной гражданским законодательством сделкой, которая заключается в виртуальном пространстве. Содержательно правоотношения между сторонами оформляются известными текущему правопорядку обязательствами. Как правило, в соглашении найдется место купле-продаже (Lamoda), оказанию услуг (Wildberries), агентированию и доставке (Delivery Club), даже лицензированию (все вышеперечисленные). И это далеко не предел.",
    },

    authorization: {
        h3: "Вход в аккаунт",

        form: {
            emailLabel: "E-mail",
            emailPlaceholder: "Введите E-mail адрес",

            passwordLabel: "Пароль",
            passwordPlaceholder: "Введите пароль",

            buttonSubmit: "Войти",
            buttonFargotPassword: "Забыли пароль?",
            buttonRegistration: "Регистрация",
        },
        errors: {
            "invalid-data": "Неправильный логин / пароль",
            "not-found": "Пользователь не найден"
        }
    },
    forgotPassword: {
        h3: "Забыли пароль",
        caption: "Пожалуйста введите свою электронную почту, чтобы получить временный пароль",

        form: {
            buttonSubmit: "Продолжить",
        }
    },
    forgotPasswordConfirm: {
        h3: "Подтверждение",
        caption: "Введите полученный временный пароль <br/>в поле ниже и нажмите Подтвердить",
        form: {
            passwordLabel: "Временный пароль",
            passwordPlaceholder: "Введите временный пароль",
        },
        errors: {
            "invalid-data": "Неправильный код подтверждения",
            passwordsMustMatch: "Пароли не совпадают",
        }
    },
    registration: {
        h3: "Регистрация",
        caption: "Введите адрес вашей электронной почты",
        captionPrivacyPolicy: "Пожалуйста, подтвердите, что вы ознакомились и согласны со следующими документами",

        form: {
            emailLabel: "E-mail",
            emailPlaceholder: "Введите E-mail адрес",

            privacyPolicy: "Политика конфидециальности",
            termsUse: "Пользовательское соглашение",
        },
        errors: {
            confict: "Пользователь уже зарегистрирован",
        },
    },
    registrationConfirm: {
        h3: "Подтверждение",
        caption: "На адрес вашей электронной почты отправлено письмо с временным паролем. Введите пароль в поле ниже <br/>и нажмите Подтвердить",
        buttonNext: "Подтвердить",

        errors: {
            "invalid-data": "Неправильный пароль",
        }
    },
    profileForm: {
        title: "Мой профиль",
        caption: "<span style='color: #F5386A'>Важно!</span> Указывайте реальные данные, <br/>это поможет вам в будущем формировать именные выписки и документы автоматически.",
        exitTooltip: "Выйти из профиля",

        form: {
            emailLabel: "Почта",
            emailPlaceholder: "",

            wisewinPatronCodeLabel: "Наставник",
            wisewinPatronCodeLabelCaption: "(необязательно)",
            wisewinPatronCodePlaceholder: "Введите реферальный код",

            firstNameLabel: "Имя",
            firstNameLabelCaption: "(реальное имя)",
            firstNamePlaceholder: "Введите имя",

            lastNameLabel: "Фамилия",
            lastNameLabelCaption: "(реальная фамилия)",
            lastNamePlaceholder: "Введите фамилию",

            middleNameLabel: "Отчество",
            middleNameLabelCaption: "(реальное отчество)",
            middleNamePlaceholder: "Введите отчество",

            dobLabel: "Дата рождения",

            countryLabel: "Страна",
            countryLabelCaption: "",
            countryPlaceholder: "Введите страну",

            cityLabel: "Город",
            cityLabelCaption: "",
            cityPlaceholder: "Введите город",

            phoneLabel: "Телефон",
            phoneLabelCaption: "",
            phonePlaceholder: "Введите номер телефона",

            telegramUsernameLabel: "Телефон",
            telegramUsernameLabelCaption: "",
            telegramUsernamePlaceholder: "Введите номер телефона",
        }
    },

    footer: {
        termsOfUse: "footer.termsOfUse",
        privacyPolicy: "footer.privacyPolicy",
    },


    // common
    yup: {
        string: "Введена не строка",
        required: "Обязательно к заполнению",
        email: "Некоректный Email",
        min: "Минимальная длина {{min}}"
    },
    errors: {
        "internal-error": "Ошибка сервера"
    },
};
