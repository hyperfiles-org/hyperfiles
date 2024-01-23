/* Translating the PayingResolver.sol contract into Rust for a Substrate blockchain environment involves implementing a pallet that handles the payment logic for attesters. This translation must consider that Substrate has a different way of handling transactions and balances compared to Ethereum, and there is no direct equivalent of OpenZeppelin's smart contract libraries.
  set_incentive: This function sets the incentive amount for the attesters.
  on_attest: This function handles the logic for paying the attester when an attestation is made.
  on_revoke: This function handles the logic for returning the payment during the revocation of an attestation.
Note that this code does not handle all aspects of a production-level contract (such as error handling and security checks) and is meant as a starting point. In a real-world application, especially when handling funds, it is crucial to ensure that your code is secure and well-tested. Substrate's environment and Rust's type system provide robust tools for building secure and efficient blockchain applications, but they require a deep understanding of the framework's specifics.
*/

#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, dispatch, ensure, traits::{Currency, ExistenceRequirement},
};
use sp_std::prelude::*;
use frame_system::ensure_signed;

// Assuming definitions for IEAS and Attestation
use crate::{IEAS, Attestation};

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;

    // Using the native currency of the blockchain for payments
    type Currency: Currency<Self::AccountId>;
}

decl_storage! {
    trait Store for Module<T: Config> as PayingResolver {
        Incentive get(fn incentive): T::Balance;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId, Balance = <T as Config>::Balance {
        // Event emitted when payment is made to attester
        PaymentMade(AccountId, Balance),
        // Event emitted when payment is returned during revocation
        PaymentReturned(AccountId, Balance),
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        type Error = dispatch::DispatchError;

        fn deposit_event() = default;

        // Set the incentive during contract deployment
        #[weight = 10_000]
        pub fn set_incentive(origin, incentive: T::Balance) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            Incentive::<T>::put(incentive);
            Ok(())
        }

        // Function to handle payment logic when attestation is made
        // This should be called by the attestation creation logic
        #[weight = 10_000]
        pub fn on_attest(origin, attestation: Attestation) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            let incentive = Incentive::<T>::get();
            T::Currency::transfer(&who, &attestation.attester, incentive, ExistenceRequirement::KeepAlive)?;
            Self::deposit_event(RawEvent::PaymentMade(attestation.attester, incentive));
            Ok(())
        }

        // Function to handle payment return logic during revocation
        // This should be called by the attestation revocation logic
        #[weight = 10_000]
        pub fn on_revoke(origin, attestation: Attestation, value: T::Balance) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            let incentive = Incentive::<T>::get();
            ensure!(value >= incentive, "Not enough value to return payment");
            T::Currency::transfer(&attestation.attester, &who, value, ExistenceRequirement::AllowDeath)?;
            Self::deposit_event(RawEvent::PaymentReturned(attestation.attester, value));
            Ok(())
        }
    }
}