import React from 'react';
import { BounceLoader, BarLoader, CircleLoader, ClipLoader, FadeLoader,HashLoader, BeatLoader, ClimbingBoxLoader, DotLoader, GridLoader, MoonLoader, PacmanLoader, PropagateLoader, PulseLoader, RingLoader } from 'react-spinners';
import { getBoostrapColor } from '../../util/util';
export const Spinner = (props) => {
    return  <BounceLoader color={getBoostrapColor(props.color)} loading = {props.loading} />
}

export const SpinnerDots = (props) => {
    return <BeatLoader color={getBoostrapColor(props.color)} loading={props.loading} size={props.size} />
}