'use client';

import { useState, FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { apiRequest } from '@/helpers/apiRequest';
interface AddCardForWithdrawalProps {
  onCardAdded?: () => void; // optional callback after adding a card
}

const AddCardForWithdrawal: React.FC<AddCardForWithdrawalProps> = ({ onCardAdded }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleAddCard = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe is not loaded yet.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found.');

      // Step 1: Create Payment Method in Stripe
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) throw new Error(stripeError.message);

      // Step 2: Send paymentMethodId to backend via your custom fetch
      const response = await apiRequest('/withdrawals/cards/add', {
        method: 'POST',
        body: { paymentMethodId: paymentMethod.id },
      });

      if (!response.success) {
        throw new Error(response.message || response.error || 'Failed to add card');
      }

      setSuccess(true);
      cardElement.clear();

      // Call parent callback if provided
      onCardAdded?.();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add Debit Card</h2>
      <form onSubmit={handleAddCard}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Card Information</label>
          <div className="border border-gray-300 rounded p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Card added successfully! ✅
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-4 text-sm">
          ⚠️ <strong>Important:</strong> Only <strong>Debit Cards</strong> are supported for withdrawals.
          Credit cards cannot receive payouts.
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Adding Card...' : 'Add Card'}
        </button>
      </form>
    </div>
  );
};

export default AddCardForWithdrawal;
