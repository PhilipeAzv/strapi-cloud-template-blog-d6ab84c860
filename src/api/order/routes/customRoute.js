module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/order', 
            handler: 'order.customAction',
            config: {
                auth: false,
            }
        }
    ]
}
