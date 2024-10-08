import { combineSlices } from "@reduxjs/toolkit"
import orgSlice from "./orgSlice/orgSlice"
export default combineSlices(
    {
        organization: orgSlice,
    }
)
