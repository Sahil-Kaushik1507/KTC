import useGrandTotal from "../../../hooks/useGrandTotal";


 const truckFields =  [
    "truck_freight.freightamt",
    "truck_freight.labour",
    "truck_freight.holding",
    "truck_freight.multipoint_pickup",
    "truck_freight.multipoint_delivery",
    "truck_freight.other_charges",
  ]

const truckTotalField ="truck_freight.grand_total"


 const partyFields =  [
    "party_freight.freightamt",
    "party_freight.labour",
    "party_freight.holding",
    "party_freight.multipoint_pickup",
    "party_freight.multipoint_delivery",
    "party_freight.docket_charge",
    "party_freight.green_tax",
    "party_freight.other_charges",
    "party_freight.gst_amt",
    "party_freight.other_state_tax_amt",
  ]
const partyTotalField= "party_freight.grand_total"



export default function useTruckPartyGrandTotal(){
    const truckTotal= useGrandTotal(truckFields,truckTotalField)
    const partyTotal = useGrandTotal(partyFields, partyTotalField)

    return [truckTotal, partyTotal]
}