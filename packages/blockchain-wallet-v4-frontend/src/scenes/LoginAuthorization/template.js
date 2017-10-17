import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Button, Icon, Separator, Text, TextGroup } from 'blockchain-info-components'

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  background-color: ${props => props.theme['white']};

  @media(min-width: 768px) { 
    width: 550px; 
  }
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SuccessIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  border: 5px ${props => props.theme['success']} solid;
  border-radius: 100%;
`
const SuccessIcon = styled(Icon)`
  transform: scale(1.5, 1.5);
`
const HeaderText = styled(Text)`
  padding: 10px 0px;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const ButtonContainer = styled(InfoContainer)`
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
`

const LoginAuthorization = (props) => {
  const { status } = props
  switch (status) {
    case 'token':
      return (
        <Wrapper>
          <Header>
            <SuccessIconWrapper>
              <SuccessIcon name='checkmark' color='success' />
            </SuccessIconWrapper>
            <HeaderText size='18px' weight={300} capitalize>
              <FormattedMessage id='scenes.loginauthorization.success' defaultMessage='Success!' />
            </HeaderText>
          </Header>
          <Text size='13px' weight={300}>
            <FormattedMessage id='scenes.loginauthorization.explain' defaultMessage='Login approved! Please return to your previous browser / tab to see your wallet.' />
          </Text>
          <Separator />
        </Wrapper>
      )

    case 'token-other-browser':
      const { requestingBrowser, requestingIP, requestingCountry, thisDeviceBrowser, thisDeviceIP, thisDeviceCountry, handleAccept, handleReject } = props
      return (
        <Wrapper>
          <Header>
            <HeaderText size='18px' weight={300} capitalize>
              <FormattedMessage id='scenes.loginauthorization.otherbrowser' defaultMessage='Login attempt from other browser' />
            </HeaderText>
          </Header>
          <TextGroup>
            <Text size='13px' weight={300}>
              <FormattedMessage id='scenes.loginauthorization.info' defaultMessage='Someone, hopefully you, is attempting to login to your wallet from a different browser.' />
            </Text>
            <Text size='13px' weight={300}>
              <FormattedMessage id='scenes.loginauthorization.browserchanged' defaultMessage='Browser User Agent Changed' />
            </Text>
          </TextGroup>
          <Separator />
          <InfoContainer>
            <InfoColumn>
              <Text>
                <FormattedMessage id='scenes.loginauthorization.requesting.title' defaultMessage='Requesting device' />
              </Text>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.requesting.browser' defaultMessage='Browser:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.requesting.browserinfo' defaultMessage={requestingBrowser} />
                </Text>
              </TextGroup>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.requesting.ip' defaultMessage='IP address:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.requesting.ipinfo' defaultMessage={requestingIP} />
                </Text>
              </TextGroup>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.requesting.country' defaultMessage='Country of Origin:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.requesting.countryinfo' defaultMessage={requestingCountry} />
                </Text>
              </TextGroup>
            </InfoColumn>
            <InfoColumn>
              <Text>
                <FormattedMessage id='scenes.loginauthorization.thisdevice.title' defaultMessage='This device' />
              </Text>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.browser' defaultMessage='Browser:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.browserinfo' defaultMessage={thisDeviceBrowser} />
                </Text>
              </TextGroup>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.ip' defaultMessage='IP address:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.ipinfo' defaultMessage={thisDeviceIP} />
                </Text>
              </TextGroup>
              <TextGroup inline>
                <Text size='13px'>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.country' defaultMessage='Country of Origin:' />
                </Text>
                <Text size='13px' weight={300}>
                  <FormattedMessage id='scenes.loginauthorization.thisdevice.countryinfo' defaultMessage={thisDeviceCountry} />
                </Text>
              </TextGroup>
            </InfoColumn>
          </InfoContainer>
          <ButtonContainer>
            <Button nature='primary' onClick={() => handleAccept()}>
              <FormattedMessage id='scenes.loginauthorization.accept' defaultMessage='Accept' />
            </Button>
            <Button nature='logout' onClick={() => handleReject()}>
              <FormattedMessage id='scenes.loginauthorization.reject' defaultMessage='Reject' />
            </Button>
          </ButtonContainer>
        </Wrapper>
      )
    default: // should be 'wrong-token'
      return (
        <Redirect to='/wallet' exact />
      )
  }
}

export default LoginAuthorization
