import {useQuery} from '@tanstack/react-query'

import {newDocketInitialData} from '../api/newDocketApi.js'

export default function useDocketInitialData(branch_id,branch_code){

    return useQuery({
        queryKey:["new-docket-initial-data",branch_id],

        queryFn:()=>newDocketInitialData({branch_id,branch_code}),

        enabled: !!branch_id,

        staleTime:1000*60*15,
    })
}
