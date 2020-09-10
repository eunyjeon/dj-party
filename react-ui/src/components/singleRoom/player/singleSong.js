import React from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SongDiv = styled(Container)`
  margin: 5px;
  color: white;
`

export default function Song(props) {
  let albumImgUrl = props.albumImg.url
  let artists = props.artists.map((artist) => artist.name)

  return (
    <SongDiv>
      <Row xs={2}>
        <Col xs="auto">
          <img src={albumImgUrl} alt="" />
          {/*           <p>{props.album}</p> */}
        </Col>
        <Col xs="auto">
          <h5>{props.name}</h5>
          <p>{artists}</p>
        </Col>
      </Row>
    </SongDiv>
  )
}
