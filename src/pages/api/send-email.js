import { sendEmail } from '../../services/api.js';

// Configurar para SSR
export const prerender = false;

export async function POST({ request }) {
  try {
    const emailContent = await request.json();
    
    console.log('📧 Enviando email:', emailContent);
    
    const response = await sendEmail(emailContent);
    
    if (response) {
      console.log('✅ Email enviado exitosamente');
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      console.error('❌ Error al enviar email');
      return new Response(JSON.stringify({ success: false, error: 'Error al enviar email' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  } catch (error) {
    console.error('❌ Error en endpoint send-email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 