'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddCardForWithdrawal from './AddCardForWithdrawal';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const AddCardPage = () => {
  const handleCardAdded = () => {
    // Optional: refresh the card list or show a toast
    console.log('Card successfully added!');
  };

  return (
    <Elements stripe={stripePromise}>
      <AddCardForWithdrawal onCardAdded={handleCardAdded} />
    </Elements>
  );
};

export default AddCardPage;
