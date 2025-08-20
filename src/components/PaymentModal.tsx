import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { X, CreditCard, Loader2, CheckCircle } from 'lucide-react';
import { stripePromise, createPaymentIntent, SubscriptionPlan } from '../lib/stripe';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onSuccess?: (paymentIntent: any) => void;
  subscriptionPlan?: SubscriptionPlan;
}

const PaymentForm: React.FC<{
  amount: number;
  description: string;
  onSuccess?: (paymentIntent: any) => void;
  onClose: () => void;
}> = ({ amount, description, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // إنشاء Payment Intent
      const { client_secret } = await createPaymentIntent(amount);

      // تأكيد الدفع
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('عنصر البطاقة غير متاح');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message || 'حدث خطأ أثناء الدفع');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        onSuccess?.(paymentIntent);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء معالجة الدفع');
    } finally {
      setLoading(false);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">تم الدفع بنجاح!</h3>
        <p className="text-gray-600">شكراً لك، تم تأكيد دفعتك</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{description}</h3>
        <p className="text-2xl font-bold text-emerald-600">{amount} ريال</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          معلومات البطاقة
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin ml-2" />
            جاري المعالجة...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5 ml-2" />
            ادفع {amount} ريال
          </>
        )}
      </button>
    </form>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  description,
  onSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-8">
          <CreditCard className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">إتمام الدفع</h2>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={amount}
            description={description}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;