import React from 'react';

export default function SingleMessage(props) {
    return (
    <div>
        <p>
        {props.user.spotifyUsername}: {props.message}
        </p>
    </div>
    )
}
