import useAuth from "../../auth/hooks/useAuth";
import useDocketInitialData from "./useDocketInitialData";

export default function useDocketFormDefaultValues() {
  const { user } = useAuth();

  const { data } = useDocketInitialData(
    user?.branch_id,
    user?.branch_code
  );

  return {
    source:user?.branch_name,
    docket_items: [
      {
        product_name: "",
        total_packages: "",
        packaging_method: "",
        declared_value: "",
      },
    ],
    truck_freight: { grand_total: "₹ 0.00" },
    party_freight: { grand_total: "₹ 0.00" },
    billing_branch_id: user?.branch_id ?? "",
    request_id: crypto.randomUUID(),
  };
}