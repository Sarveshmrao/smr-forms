import { InfoCircleOutlined } from '@ant-design/icons/lib'
import { Form, Input, Select, Switch, Tabs } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { TabPaneProps } from 'antd/lib/tabs'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { AdminFormFieldFragment } from '../../../graphql/fragment/admin.form.fragment'

interface Props extends TabPaneProps {
  form: FormInstance
  fields: AdminFormFieldFragment[]
}

export const RespondentNotificationsTab: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const [enabled, setEnabled] = useState<boolean>()

  useEffect(() => {
    const next = props.form.getFieldValue(['form', 'respondentNotifications', 'enabled']) as boolean

    if (next !== enabled) {
      setEnabled(next)
    }
  }, [props.form.getFieldValue(['form', 'respondentNotifications', 'enabled'])])

  useEffect(() => {
    props.form
      .validateFields([
        ['form', 'respondentNotifications', 'subject'],
        ['form', 'respondentNotifications', 'htmlTemplate'],
        ['form', 'respondentNotifications', 'toField'],
      ])
      .catch((e: Error) => console.error('failed to validate fields', e))
  }, [enabled])

  const groups: {
    [key: string]: AdminFormFieldFragment[]
  } = {}

  props.fields.forEach((field) => {
    if (!groups[field.type]) {
      groups[field.type] = []
    }
    groups[field.type].push(field)
  })

  return (
    <Tabs.TabPane {...props}>
      <Form.Item
        label={t('form:respondentNotifications.enabled')}
        name={['form', 'respondentNotifications', 'enabled']}
        valuePropName={'checked'}
      >
        <Switch onChange={(e) => setEnabled(e.valueOf())} />
      </Form.Item>

      <Form.Item
        label={t('form:respondentNotifications.subject')}
        name={['form', 'respondentNotifications', 'subject']}
        rules={[
          {
            required: enabled,
            message: t('validation:subjectRequired'),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t('form:respondentNotifications.htmlTemplate')}
        name={['form', 'respondentNotifications', 'htmlTemplate']}
        rules={[
          {
            required: enabled,
            message: t('validation:templateRequired'),
          },
        ]}
        extra={
          <div>
            <Trans>form:respondentNotifications.htmlTemplateInfo</Trans>
            <a
              href={'https://mjml.io/try-it-live'}
              target={'_blank'}
              rel={'noreferrer'}
              style={{
                marginLeft: 16,
              }}
            >
              <InfoCircleOutlined />
            </a>
          </div>
        }
      >
        <Input.TextArea autoSize />
      </Form.Item>

      <Form.Item
        label={t('form:respondentNotifications.toField')}
        name={['form', 'respondentNotifications', 'toField']}
        extra={t('form:respondentNotifications.toFieldInfo')}
        rules={[
          {
            required: enabled,
            message: t('validation:emailFieldRequired'),
          },
        ]}
      >
        <Select>
          {Object.keys(groups).map((key) => (
            <Select.OptGroup label={key.toUpperCase()} key={key}>
              {groups[key].map((field) => (
                <Select.Option value={field.id} key={field.id}>
                  {field.title}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label={t('form:respondentNotifications.fromEmail')}
        name={['form', 'respondentNotifications', 'fromEmail']}
        extra={t('form:respondentNotifications.fromEmailInfo')}
      >
        <Input />
      </Form.Item>
    </Tabs.TabPane>
  )
}
