module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-resend',
      providerOptions: {
        apiKey: env('RESEND_API_KEY', 're_HUbmC8ay_CH1H4FoY2jusxTJqDDWCbGrv'), // Required
      },
      settings: {
        defaultFrom: 'contato@aeromarchon.com',
        defaultReplyTo: 'contato@aeromarchon.com',
      },
    }
  },    
});