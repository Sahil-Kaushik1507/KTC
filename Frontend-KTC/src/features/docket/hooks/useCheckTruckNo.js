import { useFormContext } from "react-hook-form";
import { getTruckDetails } from "../api/newDocketApi";

export const useCheckTruckNo = () => {
  const { trigger, getValues, setValue } = useFormContext();

  const checkTruckNo = async () => {
    // 1. Validate only the truck number first
    const isValid = await trigger("truck_details.truck_no");
    if (!isValid) return;

    const truckNo = getValues("truck_details.truck_no");

    try {
      const response = await getTruckDetails({ "truck_no": truckNo });
      
      // Check if data exists in the response safely
      const truckData = response?.data?.[0];

      if (truckData) {
        // 2. Set values. If you notice too many renders, change shouldValidate to false
        const options = { shouldValidate: true, shouldDirty: true };

        setValue("truck_details.vehicle_id", truckData.vehicle_id, options);
        setValue("truck_details.actual_weight", truckData.actual_weight, options);
        setValue("truck_details.driver_phone", truckData.driver_phone, options);
        setValue("truck_details.driver_name", truckData.driver_name, options);
        setValue("truck_details.size_id", truckData.size_id, options);
      } else {
        // 3. Clear values if no truck details found
        const clearOptions = { shouldValidate: false, shouldDirty: true };
        
        setValue("truck_details.vehicle_id", null, clearOptions);
        setValue("truck_details.actual_weight", null, clearOptions);
        setValue("truck_details.driver_phone", null, clearOptions);
        setValue("truck_details.driver_name", null, clearOptions);
        setValue("truck_details.size_id", null, clearOptions);
      }
    } catch (error) {
      console.error("Failed to fetch truck details:", error);
    }
  };

  return checkTruckNo;
};