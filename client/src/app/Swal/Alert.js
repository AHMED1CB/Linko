import Swl from "./config";

export default class Alert {

    static configure(theme){
        Alert.theme = theme;
    }

    static error(title, message ) {
        Swl.fire({
            title,
            text: message,
            icon: 'error',
            background:Alert.theme.palette.background.paper,
            color:Alert.theme.palette.text.primary,
            showConfirmButton:false
        })

    }

}