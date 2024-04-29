'use strict';

/**
 * order controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async customAction(ctx) {
        try {
            const orderId = ctx.params.id; // Acessa o ID dinâmico da rota

            // Busca o objeto correspondente ao ID no banco de dados
            const order = await strapi.db.query('api::order.order').findOne({
                where: {
                 id: orderId
                },
              });
              
            if (!order) {
                // Se o pedido não for encontrado, retorne um erro 404
                ctx.status = 404;
                ctx.send({ message: 'Pedido não encontrado.' });
                return;
            }

     

            const options = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer 290B437BE5AA411FAAE6CA1638B99F56',
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    reference_id: 'REFERÊNCIA DO PRODUTO',
    expiration_date: '2023-08-14T19:09:10-03:00',
    customer: {
      name: 'João teste',
      email: 'joao@teste.com',
      tax_id: '00000000000',
      phone: {country: '+55', area: '27', number: '999999999'}
    },
    customer_modifiable: true,
    items: [
      {
        reference_id: 'ITEM01',
        name: 'Nome do Produto',
        quantity: 1,
        unit_amount: 500,
        image_url: 'https://www.petz.com.br/blog//wp-content/upload/2018/09/tamanho-de-cachorro-pet-1.jpg'
      }
    ],
    additional_amount: 0,
    discount_amount: 0,
    shipping: {
      type: 'FREE',
      amount: 0,
      service_type: 'PAC',
      address: {
        country: 'BRA',
        region_code: 'SP',
        city: 'São Paulo',
        postal_code: '01452002',
        street: 'Faria Lima',
        number: '1384',
        locality: 'Pinheiros',
        complement: '5 andar'
      },
      address_modifiable: true,
      box: {dimensions: {length: 15, width: 10, height: 14}, weight: 300}
    },
    payment_methods: [
      {type: 'credit_card', brands: ['mastercard']},
      {type: 'credit_card', brands: ['visa']},
      {type: 'debit_card', brands: ['visa']},
      {type: 'PIX'},
      {type: 'BOLETO'}
    ],
    payment_methods_configs: [
      {
        type: 'credit_card',
        config_options: [{option: 'installments_limit', value: '1'}]
      }
    ],
    soft_descriptor: 'xxxx',
    redirect_url: 'https://pagseguro.uol.com.br',
    return_url: 'https://pagseguro.uol.com.br',
    notification_urls: ['https://pagseguro.uol.com.br']
  })
};
            
            // Realiza a solicitação POST para a API do PagSeguro usando o Axios
            try {
                const response = await axios.post('https://sandbox.api.pagseguro.com/checkouts', options);
            
                // Os dados da resposta já estão disponíveis em response.data
                ctx.send(response)
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
            
            console.log(order)
            ctx.send(order);
        } catch (err) {
            console.error('Erro ao lidar com a solicitação:', err);
            ctx.status = 500;
            ctx.send('Erro ao processar a solicitação.');
        }
    }
}));