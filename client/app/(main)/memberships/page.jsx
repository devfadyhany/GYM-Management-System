"use client"

import MembershipCard from '../../components/MembershipCard'
import React from 'react'
import { Container, Row } from 'react-bootstrap'

function MembershipsPage() {
  return (
    <Container style={{marginTop: "100px"}}>
      <h1 className='lead BoldText text-center mb-5'>Our Memberships</h1>
      <Row className='gap-5 justify-content-center mb-5'>
        <MembershipCard icon="basicMembership.svg" title="basic" description="3-Months Subcription" features={["Chat With Your Personal Trainer"]}/>
        <MembershipCard icon="proMembership.svg" title="pro" description="6-Months Subscription" features={["Chat With Your Personal Trainer", "Choose Your Personal Trainer"]}/>
        <MembershipCard icon="organizeFeature.svg" title="premium" description="12-Months Subscription" features={["Chat With Your Personal Trainer", "Choose Your Personal Trainer", "Organize Your Training Schedule"]}/>
      </Row>
    </Container>
  )
}

export default MembershipsPage