import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { planId, customerId } = await req.json()

    if (!planId) {
      throw new Error('معرف الخطة مطلوب')
    }

    // خطط الأسعار في Stripe (يجب إنشاؤها مسبقاً في لوحة تحكم Stripe)
    const stripePriceIds = {
      'basic_monthly': 'price_basic_monthly_id',
      'premium_monthly': 'price_premium_monthly_id',
      'premium_yearly': 'price_premium_yearly_id',
    }

    const priceId = stripePriceIds[planId as keyof typeof stripePriceIds]
    if (!priceId) {
      throw new Error('خطة غير صحيحة')
    }

    // إنشاء عميل جديد إذا لم يكن موجوداً
    let customer
    if (customerId) {
      customer = await stripe.customers.retrieve(customerId)
    } else {
      customer = await stripe.customers.create({
        metadata: {
          platform: 'halaqah',
        },
      })
    }

    // إنشاء الاشتراك
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    // حفظ الاشتراك في قاعدة البيانات
    const { error: dbError } = await supabase
      .from('subscriptions')
      .insert({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customer.id,
        plan_name: planId,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })

    if (dbError) {
      console.error('خطأ في حفظ الاشتراك:', dbError)
    }

    return new Response(
      JSON.stringify({
        subscription_id: subscription.id,
        client_secret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('خطأ في إنشاء الاشتراك:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'حدث خطأ أثناء إنشاء الاشتراك',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})