import inquirer from 'inquirer';
import { Command, Console } from 'nestjs-console';
import { matchType, validatePassword } from '../config/fields';
import { UserCreateService } from '../service/user/user.create.service';

@Console({
  name: 'user',
  description: 'handle instance users'
})
export class UserCommand {
  constructor(
    private readonly createUser: UserCreateService
  ) {
  }

  @Command({
    command: 'create',
  })
  async create(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'username for login',
      },
      {
        type: 'input',
        name: 'email',
        message: 'email to send notifications to',
        validate(input: string): boolean | string {
          if (!matchType.email.test(input)) {
            return 'invalid email'
          }

          return true
        },
      },
      {
        type: 'password',
        name: 'password',
        validate: validatePassword,
        message: 'password to login',
      },
      {
        type: 'confirm',
        name: 'create',
        message: current => {
          return `create user ${current.username} with email ${current.email}`
        }
      }
    ])

    await this.createUser.create(answers)

    console.info(`user ${answers.username} has been created`)
  }

  @Command({
    command: 'activate <username>',
  })
  async activate(username: string): Promise<void> {
    console.log(`activate user ${username}`)
  }
}
