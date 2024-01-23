/* set_specified_attester: This function sets the specified attester. This could be restricted to be called only once or by certain privileged accounts (e.g., during contract deployment).
verify_attestation: An external function that takes an Attestation as input and checks if it's from the specified attester.
is_attestation_valid: A helper function that performs the actual check.
This Rust code provides the basic functionality for an AttesterResolver.sol equivalent in a Substrate-based blockchain. Remember, the specific implementation details might vary depending on your blockchain's design and the external components' functionalities.*/

#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{decl_module, decl_storage, decl_event, dispatch, ensure};
use sp_std::prelude::*;
use frame_system::ensure_signed;

// Assuming definitions for IEAS and Attestation exist
use crate::{IEAS, Attestation};

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as AttesterResolver {
        // The specified attester set during contract deployment
        SpecifiedAttester get(fn specified_attester): T::AccountId;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        // Event triggered when an attestation is successfully verified
        AttestationVerified(AccountId),
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        // Set the specified attester during contract deployment
        #[weight = 10_000]
        pub fn set_specified_attester(origin, attester: T::AccountId) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            // Logic to ensure only callable during deployment or by authorized users
            SpecifiedAttester::<T>::put(&attester);
            Ok(())
        }

        // Function to verify attestation
        // This needs to be called externally, e.g., when an attestation is submitted
        #[weight = 10_000]
        pub fn verify_attestation(origin, attestation: Attestation) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            ensure!(Self::is_attestation_valid(&attestation), "Invalid attestation source");
            Self::deposit_event(RawEvent::AttestationVerified(attestation.attester));
            Ok(())
        }
    }
}

impl<T: Config> Module<T> {
    // Function to check if an attestation is from the specified attester
    fn is_attestation_valid(attestation: &Attestation) -> bool {
        attestation.attester == SpecifiedAttester::<T>::get()
    }
}
