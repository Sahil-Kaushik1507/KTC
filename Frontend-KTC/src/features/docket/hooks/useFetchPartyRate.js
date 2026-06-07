
import { useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { getRateDetails } from '../api/newDocketApi';


export function useFetchPartyRate() {
  const { trigger, setValue } = useFormContext();

  const [source, destination, consignorId, sizeId] = useWatch({
    name: ["source", "destination", "consignor_id", "truck_details.size_id"]
  });

  useEffect(() => {
    const autoFetchPartyRate = async () => {
      if (!source || !destination || !consignorId || !sizeId) {
        setValue("party_freight.freightamt", null, { shouldDirty: true });
        return;
      }

      // 2. Validate all fields simultaneously
      const [isValidSrc, isValidDest, isValidCons, isValidSz] = await Promise.all([
        trigger("source"),
        trigger("destination"),
        trigger("consignor_id"),
        trigger("truck_details.size_id")
      ]);

      if (!isValidSrc || !isValidDest || !isValidCons || !isValidSz) return;

      // 3. Fetch data if valid
      try {
        
        const rateDetails = await getRateDetails({
          consignor_party_id: consignorId,
          source,
          destination,
          size_id: sizeId,
        });

        if (rateDetails?.data?.freight?.[0]) {
          setValue("party_freight.freightamt", rateDetails.data.freight[0].freight, { 
            shouldValidate: true, 
            shouldDirty: true 
          });
        } else {
          setValue("party_freight.freightamt", null, { shouldDirty: true });
        }
      } catch (error) {
        console.error("Error fetching rate:", error);
        setValue("party_freight.freightamt", null);
      }
    };

    autoFetchPartyRate();
  }, [source, destination, consignorId, sizeId, trigger, setValue]);
}