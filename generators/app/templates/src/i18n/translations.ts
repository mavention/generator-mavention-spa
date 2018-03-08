import en_dictionary from './en_US.dictionary';
import nl_dictionary from './nl_NL.dictionary';

const structure = {
    Index: {
        Title: '@:Dictonary.AppTitle',
        SubTitle: '@:Dictonary.AppSubTitle',
        Menu: {
            Home: '@:Dictonary.Home',
            User: '@:Dictonary.User',
        },
        Dropdown: {
            Languages: '@:Dictonary.Languages',
            English: '@:Dictonary.English',
            Dutch: '@:Dictonary.Dutch',
            About: '@:Dictonary.About',
            MyAccount: '@:Dictonary.MyAccount',
            Logout: '@:Dictonary.Logout',
        }
    },
    Home: {
        Header: '@:Dictonary.Home',
        Description: '@:Dictonary.HomeDescription',
    },
    User: {
        Header: '@:Dictonary.User',
        Description: '@:Dictonary.UserDescription',
    },
    About: {
        Header: '@:Dictonary.About',
        Description: '@:Dictonary.AboutDescription',
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
