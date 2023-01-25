export = {
    success: (status: number, message: string, data: any) => {
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },

    fail: (status: number, message: string) => {
        return {
            status: status,
            success: false,
            message: message
        }
    }
};