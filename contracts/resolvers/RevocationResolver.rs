/* Translating the RevocationResolver.sol contract into Rust for a Substrate blockchain involves implementing a pallet that controls the revocation of attestations based on a state variable.
In this case, the pallet will allow all attestations to be created without additional conditions, but the ability to revoke attestations will be controlled by a boolean flag.
set_revocation: This function allows changing the _revocation state variable, which controls whether revocations are allowed or not.
on_attest: This function is for creating attestations and allows all attestations without additional conditions.
on_revoke: This function checks the revocation status and decides whether an attestation can be revoked based on the state of RevocationAllowed.
This implementation provides the basic functionality as described in the RevocationResolver.sol contract, adapted for a Substrate-based environment. Depending on your specific blockchain setup and requirements, you may need to adjust or extend this implementation, particularly in terms of access control for the set_revocation function and the actual processing logic for attestation creation and revocation. */

#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, dispatch, ensure,
};
use frame_system::ensure_signed;

// Assuming definitions for IEAS and Attestation
use crate::{IEAS, Attestation};

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as RevocationResolver {
        // Boolean flag to control revocation
        RevocationAllowed get(fn revocation_allowed): bool;
    }
}

decl_event! {
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        // Event for revocation status change
        RevocationStatusChanged(bool),
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        // Function to set the revocation status
        #[weight = 10_000]
        pub fn set_revocation(origin, status: bool) -> dispatch::DispatchResult {
            let _ = ensure_signed(origin)?;
            RevocationAllowed::<T>::put(status);
            Self::deposit_event(RawEvent::RevocationStatusChanged(status));
            Ok(())
        }

        // Function to check if an attestation can be created
        #[weight = 10_000]
        pub fn on_attest(origin, _attestation: Attestation) -> dispatch::DispatchResult {
            ensure_signed(origin)?;
            // All attestations are allowed to be created
            Ok(())
        }

        // Function to check if an attestation can be revoked
        #[weight = 10_000]
        pub fn on_revoke(origin, _attestation: Attestation) -> dispatch::DispatchResult {
            ensure_signed(origin)?;
            ensure!(RevocationAllowed::<T>::get(), "Revocation not allowed");
            // Processing logic for revocation
            Ok(())
        }
    }
}