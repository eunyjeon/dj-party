import React from 'react'
import styled from 'styled-components'

const SpotifyButton = styled.a`
  padding: 10px 30px 10px 30px;
  margin-top: 40%;
  background-color: rgb(36, 212, 78);
  font-family: 'Montserrat', sans-serif;
  border-radius: 30px;
  color: white;
`

const LoginPage = styled.div`
  background-image: url(https://www.freepngimg.com/thumb/headphones/1-2-headphones-png-hd.png),
    linear-gradient(black, ${({ theme }) => theme.cherry});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  font-family: 'Montserrat', sans-serif;
  padding-top: 150px;
  height: calc(100vh);
`

export default function AuthForm() {
  return (
    <LoginPage>
      <SpotifyButton href="/auth/spotify">Login With Spotify</SpotifyButton>
    </LoginPage>
  )
}
