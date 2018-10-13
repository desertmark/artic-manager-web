import React from 'react';
import { BounceLoader } from 'react-spinners';
import { getBoostrapColor } from '../../util/util';
export const Spinner = (props) => {
    return  <BounceLoader color={getBoostrapColor(props.color)} loading = {props.loading} />
}