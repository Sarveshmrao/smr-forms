import React from 'react'
import styled from 'styled-components'
import { FormDesignFragment } from '../../graphql/fragment/form.fragment'

interface Props {
  type: 'question' | 'answer'
  design: FormDesignFragment
}

const Header = styled.h1`
  color: ${(props: Props) =>
    props.type === 'question'
      ? props.design.colors.questionColor
      : props.design.colors.answerColor};
`

export const StyledH1: React.FC<Props> = ({ children, ...props }) => {
  return <Header {...props}>{children}</Header>
}
