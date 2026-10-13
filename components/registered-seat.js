import { legalIdentity } from "@/content/legal-identity.mjs";

export default function RegisteredSeat() {
  return (
    <div data-registered-seat="">
      <p><strong>{legalIdentity.registeredSeatLabel}:</strong> {legalIdentity.registeredSeatAddress}</p>
      <p>{legalIdentity.customerGuidance}</p>
    </div>
  );
}
