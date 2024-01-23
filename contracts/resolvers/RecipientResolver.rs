/* Translating the RecipientResolver.sol contract into Rust for a Substrate blockchain involves implementing a pallet that checks if an attestation is made to a specific recipient, which is specified during the contract (pallet) deployment.
This functionality will be achieved by storing the target recipient and validating attestations against this stored value.
set_target_recipient: This function sets the target recipient. It can be called during the deployment of the pallet to set the recipient against whom the attestations will be checked.
verify_attestation: This function takes an Attestation as input and verifies if the recipient of the attestation matches the target recipient stored in the pallet.
This Rust code provides a basic structure for the functionality described in the RecipientResolver.sol contract. As with previous translations, it's important to adapt and expand this code to suit the specific requirements and context of your blockchain application. Substrate's architecture offers a different approach to handling data and logic, so additional considerations for security, error handling, and blockchain-specific logic may be required.
*/

#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, dispatch, ensure,
};
use sp_std::prelude::*;
use frame_system::ensure_signed;

// Assuming definitions for IEAS and Attestation
use crate::{IEAS, Attestation};

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as RecipientResolver {
        // Store the target recipient
        TargetRecipient get(fn target_recipient): T::AccountId;
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

        // Set the target recipient during contract deployment
        #[weight = 10_000]
        pub fn set_target_recipient(origin, recipient: T::AccountId) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            TargetRecipient::<T>::put(recipient);
            Ok(())
        }

        // Function to verify if an attestation is to the target recipient
        // This should be called when an attestation is made
        #[weight = 10_000]
        pub fn verify_attestation(origin, attestation: Attestation) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            ensure!(attestation.recipient == TargetRecipient::<T>::get(), "Invalid recipient");
            Self::deposit_event(RawEvent::AttestationVerified(attestation.recipient));
            Ok(())
        }
    }
}