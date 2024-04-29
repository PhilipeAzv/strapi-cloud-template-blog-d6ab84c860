'use strict';


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::purchase.purchase', {
  /**
   * Cria uma nova compra
   * POST /api/purchase/purchase
   */
  async create(ctx) {
    try {
      // Obtenha os dados enviados no corpo da requisição
      const { item_id, custom_data } = ctx.request.body;

      // Acesse o ID do usuário e outros dados personalizados
      const userId = custom_data.userId;
      // Outros dados personalizados

      // Aqui você pode processar a compra, validar o ID do usuário, etc.
      // Por exemplo, salvar a compra no banco de dados do Strapi

      // Exemplo de resposta
      return ctx.created({
        status: 'success',
        message: 'Compra criada com sucesso',
        userId,
        // Outros dados processados
      });
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      return ctx.badRequest('Erro ao criar compra');
    }
  },
});
