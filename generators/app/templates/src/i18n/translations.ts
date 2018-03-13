import en_dictionary from './en_US.dictionary';
import nl_dictionary from './nl_NL.dictionary';

const structure = {
    Index: {
        Title: '@:Dictionary.AppTitle',
        SubTitle: '@:Dictionary.AppSubTitle',
        Menu: {
            Home: '@:Dictionary.Home',
            User: '@:Dictionary.User',
        },
        Dropdown: {
            Languages: '@:Dictionary.Languages',
            English: '@:Dictionary.English',
            Dutch: '@:Dictionary.Dutch',
            About: '@:Dictionary.About',
            MyAccount: '@:Dictionary.MyAccount',
            Logout: '@:Dictionary.Logout',
        }
    },
    Home: {
        Header: '@:Dictionary.Home',
        Description: '@:Dictionary.HomeDescription',
    },
    User: {
        Header: '@:Dictionary.User',
        Description: '@:Dictionary.UserDescription',
    },
    About: {
        Header: '@:Dictionary.About',
        Description: '@:Dictionary.AboutDescription',
    },
};

const translations = {
    en: { },
    nl: { },
};

// assign translations & dictionary
Object.assign(translations.en, structure);
Object.assign(translations.en, en_dictionary);

Object.assign(translations.nl, structure);
Object.assign(translations.nl, nl_dictionary);

export default translations;
