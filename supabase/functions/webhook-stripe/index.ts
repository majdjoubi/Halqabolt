import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )

    console.log('Stripe webhook event:', event.type)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        
        // تحديث حالة الدفع في قاعدة البيانات
        await supabase
          .from('payments')
          .insert({
            stripe_payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount / 100, // تحويل من أصغر وحدة عملة
            currency: paymentIntent.currency.toUpperCase(),
            status: 'succeeded',
            metadata: paymentIntent.metadata,
          })
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('Invoice payment succeeded:', invoice.id)
        
        // تحديث حالة الاشتراك
        if (invoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              last_payment_date: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', invoice.subscription)
        }
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('Invoice payment failed:', failedInvoice.id)
        
        // تحديث حالة الاشتراك إلى معلق
        if (failedInvoice.subscription) {
          await supabase
            .from('subscriptions')
            .update({
              status: 'past_due',
            })
            .eq('stripe_subscription_id', failedInvoice.subscription)
        }
        break

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log('Subscription deleted:', deletedSubscription.id)
        
        // تحديث حالة الاشتراك إلى ملغي
        await supabase
          .from('subscriptions')
          .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', deletedSubscription.id)
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Webhook error', { status: 400 })
  }
})