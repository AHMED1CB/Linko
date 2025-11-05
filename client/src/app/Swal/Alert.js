import Swl from "./config";

export default class Alert extends Swl {

    static configure(theme) {
        Alert.theme = theme;
    }

    static error(title, message) {
        this.fire({
            title,
            text: message,
            icon: 'error',
            background: Alert.theme.palette.background.paper,
            color: Alert.theme.palette.text.primary,
            showConfirmButton: false
        })
    }


    static async askOkCancel(title, message) {

        const result = await this.fire({
            text: message,
            title,
            icon: 'warning',
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel",
            reverseButtons: false,
            focusCancel: true,
            allowOutsideClick: false,
            allowEscapeKey: true,
            showCancelButton: true,
            background: Alert.theme.palette.background.paper,
            color: Alert.theme.palette.text.primary,
        })


        return !!result.isConfirmed

    }

}