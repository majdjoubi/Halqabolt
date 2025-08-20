import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'npm:stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { amount, currency = 'sar' } = await req.json()

    if (!amount || amount < 1) {
      throw new Error('المبلغ غير صحيح')
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // التأكد من أن المبلغ رقم صحيح
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        platform: 'halaqah',
        created_at: new Date().toISOString(),
      },
    })

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        id: paymentIntent.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('خطأ في إنشاء Payment Intent:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'حدث خطأ أثناء معالجة الطلب',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})