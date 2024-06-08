'use strict';

/**
 * order controller
 */
const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async customAction(ctx) {
      async function fetchPaymentData() {
        const body = ctx.request.body
        const paymentUpdateId = JSON.parse(body).data.id
        try {
          const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentUpdateId}`, {
            headers: {
              "Authorization": "Bearer APP_USR-3703595398302708-060419-7c807ffd60b54f05c307ea4626936202-261665886"
            }
          });

          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Erro na solicitação ao Mercado Pago');
          }
        } catch (error) {
          console.error('Erro ao buscar dados de pagamento:', error);
          return {
            error: true,
            message: 'Erro na solicitação ao Mercado Pago'
          };
        }
      }

      async function setPaymentStatus(){
        const paymentUpdateData = await fetchPaymentData().then(res=>res).then(data=>data).catch(err=>err)
        const {external_reference , status } = paymentUpdateData
        if(status == 'cancelled'){
          const order = await strapi.db.query('api::order.order').findOne({
            where: {
             id: external_reference
            },
            populate: {owner: true}
          })

          const userId = order.owner.id
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {
             id: userId
            },
            populate: {owner: true}
          })
         
           if (!order || !user) {
              // Se o pedido não for encontrado, retorne um erro 404
              ctx.status = 404;
              ctx.send({ message: 'Pedido não encontrado.' });
              return;
          }

          function setPackType(){
            switch(order.description){
              case 'Pacote 1':
                return 1
              case 'Pacote 2':
                return 5
              case 'Pacote 3':
                return 10  
            }
          }

          await strapi.entityService.update('plugin::users-permissions.user', userId, {
            data: {
              post_quantity: Number(user.post_quantity) + setPackType(),
            },
          });

          ctx.status = 200
          return ctx.send({message: 'Pedido Aprovado'})
        }
      }
      return setPaymentStatus()
}}))
