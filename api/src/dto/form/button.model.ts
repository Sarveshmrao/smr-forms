import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Button')
export class ButtonModel {
  @Field({ nullable: true })
  readonly url?: string

  @Field({ nullable: true })
  readonly action?: string

  @Field({ nullable: true })
  readonly text?: string

  @Field({ nullable: true })
  readonly bgColor?: string

  @Field({ nullable: true })
  readonly activeColor?: string

  @Field({ nullable: true })
  readonly color?: string

  constructor(button: Partial<ButtonModel>) {
    this.url = button.url
    this.action = button.action
    this.text = button.text
    this.bgColor = button.bgColor
    this.activeColor = button.activeColor
    this.color = button.color
  }
}
