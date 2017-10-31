import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'

import { Button, Link, Modal, ModalHeader, ModalBody, ModalFooter, Text } from 'blockchain-info-components'
import { Form } from 'components/Form'
import CoinDisplay from 'components/CoinDisplay'
import CurrencyDisplay from 'components/CurrencyDisplay'
import ComboDisplay from 'components/ComboDisplay'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & > * { width: 150px; }
  & > :last-child { width: 100%; }
`
const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme['gray-2']};
  margin: 5px 0;
  
  & > * { padding: 10px 0; }
`

const SecondStep = (props) => {
  const { previousStep, position, total, closeAll, ...rest } = props
  const { onSubmit, fromAddress, to, message, wei, fee } = rest

  return (
    <Modal size='large' position={position} total={total}>
      <ModalHeader icon='send' onClose={closeAll}>
        <FormattedMessage id='modals.sendethereum.secondstep.title' defaultMessage='Confirm' />
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <Row>
            <Text size='16px' weight={500}>
              <FormattedMessage id='modals.sendethereum.secondstep.from' defaultMessage='From:' />
            </Text>
            <Text size='16px' weight={300}>{fromAddress}</Text>
          </Row>
          <Row>
            <Text size='16px' weight={500}>
              <FormattedMessage id='modals.sendethereum.secondstep.to' defaultMessage='To:' />
            </Text>
            <Text size='16px' weight={300}>{to}</Text>
          </Row>
          { message &&
            <Row>
              <Text size='16px' weight={500}>
                <FormattedMessage id='modals.sendethereum.secondstep.for' defaultMessage='For:' />
              </Text>
              <Text size='16px' weight={300}>{message}</Text>
            </Row>
          }
          <Row>
            <Text size='16px' weight={500}>
              <FormattedMessage id='modals.sendethereum.secondstep.payment' defaultMessage='Payment:' />
            </Text>
            <Text size='16px' weight={300}>
              <ComboDisplay>{wei}</ComboDisplay>
            </Text>
          </Row>
          <Row>
            <Text size='16px' weight={500}>
              <FormattedMessage id='modals.sendethereum.secondstep.fee' defaultMessage='Fee:' />
            </Text>
            <Text size='16px' weight={300}>
              <ComboDisplay>{fee}</ComboDisplay>
            </Text>
          </Row>
          <Summary>
            <Text size='16px' weight={300} color='transferred'>
              <FormattedMessage id='modals.sendethereum.secondstep.total' defaultMessage='Total' />
            </Text>
            <Text size='40px' weight={600} color='transferred'>
              <CoinDisplay coin='ETH'>{wei}</CoinDisplay>
            </Text>
            <Text size='20px' weight={300} color='transferred'>
              <CurrencyDisplay coin='ETH'>{wei}</CurrencyDisplay>
            </Text>
          </Summary>
          <Button type='submit' nature='primary' fullwidth uppercase>
            <FormattedMessage id='modals.sendethereum.secondstep.send' defaultMessage='Send ether' />
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Link onClick={previousStep} size='13px' weight={300}>
          <FormattedMessage id='scenes.sendethereum.secondstep.back' defaultMessage='Go back' />
        </Link>
      </ModalFooter>
    </Modal>
  )
}

SecondStep.propTypes = {

}

export default reduxForm({ form: 'sendBitcoin', destroyOnUnmount: false })(SecondStep)