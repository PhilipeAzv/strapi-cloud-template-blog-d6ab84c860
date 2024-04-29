module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/orders/:id', // Defina o parâmetro ":id" para tornar o ID dinâmico
            handler: 'order.customAction',
            config: {
                auth: false,
            }
        }
    ]
}