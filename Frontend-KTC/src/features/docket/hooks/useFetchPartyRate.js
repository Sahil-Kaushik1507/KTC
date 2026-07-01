
import { useEffect, useRef } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import { getRateDetails } from '../api/newDocketApi';


export function useFetchPartyRate() {
  const { trigger, setValue } = useFormContext();

  const [source, destination, consignorId, sizeId] = useWatch({
    name: ["source", "destination", "consignor_id", "truck_details.size_id"]
  });
  const lastRequest = useRef("");

  useEffect(() => {
    const autoFetchPartyRate = async () => {
      if (!source || !destination || !consignorId || !sizeId) {
        setValue("party_freight.freightamt", null, { shouldDirty: true });
        return;
      }

      // 2. Validate all fields simultaneously
      if (
        !source?.trim() ||
        !destination?.trim() ||
        !consignorId ||
        !sizeId
      ) {
        return;
      }

      const requestKey = `${source}|${destination}|${consignorId}|${sizeId}`;

      if (lastRequest.current === requestKey) {
        return;
      }

      lastRequest.current = requestKey;


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
            shouldValidate: false,
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