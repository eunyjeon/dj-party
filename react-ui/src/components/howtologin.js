import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import Actually from './actually'

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ThisApp = () => {
  let serverURL = 'http://localhost:3000/login/'
  let [params,setParams] = useState(null);
  let [login, setLogin] = useState(false);

  useEffect(() => {
    // var hashParams = {};
    // var e, r = /([^&;=]+)=?([^&;]*)/g,
    //     q = window.location.hash.substring(1);
    // e = r.exec(q)
    // while (e) {
    //    hashParams[e[1]] = decodeURIComponent(e[2]);
    //    e = r.exec(q);
    // }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    setParams(params = accessTokenMatch);
    // console.log('Params: ', params.access_token);
    const token = params.access_token;
    setLogin(token? login=true : login=false);
    // console.log(login)
  }, [])

  return (
    <>
      <div className="container">
        <div className="title">
          <h2>Let's Log In</h2>
        </div>
      </div>
      <div className="container">
        {login ?
          <Button onClick={serverURL}>Connect to Spotify</Button> :
          <Actually token={params.access_token} />
        }
      </div>
    </>
  );

}

export default ThisApp
