import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { Icon, Separator, Text } from 'blockchain-info-components'

const Wrapper = styled.div`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
  background-color: ${props => props.theme['white']};

  @media(min-width: 768px) { width: 550px; }
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
const SuccessText = styled(Text)`
  padding: 10px 0px;
`

const LoginAuthorization = (props) => {
  const { status } = props
  switch (status) {
    case 'success':
      return (
        <Wrapper>
          <Header>
            <SuccessIconWrapper>
              <SuccessIcon name='checkmark' color='success' />
            </SuccessIconWrapper>
            <SuccessText size='18px' weight={300} capitalize>
              <FormattedMessage id='scenes.loginauthorization.success' defaultMessage='Success!' />
            </SuccessText>
          </Header>
          <Text size='13px' weight={300}>
            <FormattedMessage id='scenes.loginauthorization.explain' defaultMessage='Login approved! Please return to your previous browser / tab to see your wallet.' />
          </Text>
          <Separator />
        </Wrapper>
      )
    default:
      return (
        <Redirect to='/wallet' exact />
      )
  }
}

export default LoginAuthorization
