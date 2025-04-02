import React from 'react'
import { Special } from '../specialist'

import { Pediatrician } from '../Pediatrician'
import { Medicine } from '../MedicineRemainder'
import { WhyChoose } from '../WhyChoose'
import { Checkup } from '../Checkup'

export const Home = () => {
  return (
    <><Special/>
 
  <Medicine/>
    <Pediatrician/>
    <WhyChoose/>
    <Checkup/>
    </>
  )
}
