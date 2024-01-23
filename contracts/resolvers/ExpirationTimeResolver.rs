/* This is a translation of the ExpirationTimeResolver.sol contract to Rust for a Substrate-based blockchain, we'll follow the same approach as before, adapting the logic to fit the pallet-based architecture of Substrate.
The Rust translation involved creating a pallet that checks if the expiration time of an attestation is later than a specific timestamp set during the deployment.
  set_valid_after: This function sets the _validAfter timestamp. This could be restricted to be called only once or by certain privileged accounts (e.g., during contract deployment).
  verify_expiration: An external function that takes an Attestation as input and checks if its expiration time is valid.
  is_expiration_valid: A helper function that performs the actual expiration time check.
As before, this code provides the basic functionality but might require additional logic or adjustments depending on your specific blockchain setup and the external components' functionalities. Substrate and Solidity have different architectures and capabilities, so make sure to adapt the logic to fit your exact requirements. */

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
    trait Store for Module<T: Config> as ExpirationTimeResolver {
        // The timestamp after which an attestation is considered valid
        ValidAfter get(fn valid_after): u64;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        // Event triggered when an attestation is successfully verified
        AttestationValid(AccountId),
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        // Set the valid after timestamp during contract deployment
        #[weight = 10_000]
        pub fn set_valid_after(origin, timestamp: u64) -> dispatch::DispatchResult {
            let who = ensure_signed(origin)?;
            // Logic to ensure only callable during deployment or by authorized users
            ValidAfter::<T>::put(timestamp);
            Ok(())
        }

        // Function to verify attestation expiration
        // This needs to be called externally, e.g., when an attestation is submitted
        #[weight = 10_000]
        pub fn verify_expiration(origin, attestation: Attestation) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            ensure!(Self::is_expiration_valid(&attestation), "Attestation expired");
            Self::deposit_event(RawEvent::AttestationValid(attestation.issuer));
            Ok(())
        }
    }
}

impl<T: Config> Module<T> {
    // Function to check if an attestation's expiration time is valid
    fn is_expiration_valid(attestation: &Attestation) -> bool {
        attestation.expiration_time >= ValidAfter::<T>::get()
    }
}
