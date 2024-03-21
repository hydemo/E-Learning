import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { Score } from '@/services/apiList/score';
import { list } from '@/services/apiList/systemPrompts';

type FormProps = {
  onCancel: () => void;
  onFinish: (values: Score) => Promise<void>;
  visible: boolean;
};

export default (props: FormProps) => {
  const { onFinish, onCancel, visible } = props;
  return (
    <ModalForm
      title={'新增'}
      autoFocusFirstInput
      visible={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      submitTimeout={2000}
      onFinish={onFinish}
    >
      <ProFormTextArea
        name="prompt"
        label="Prompt"
        placeholder="Prompt"
        rules={[
          {
            required: true,
            message: 'Prompt不能为空',
          },
        ]}
      />
      <ProFormSelect
        name="systemPrompt"
        label="System Prompt"
        request={async ({ keyWords }) => {
          const systemPrompts = await list({ name: keyWords });
          return systemPrompts?.data.map((item: any) => ({
            label: item.name,
            value: item._id,
          }));
        }}
        rules={[
          {
            required: true,
            message: 'SystemPrompt不能为空',
          },
        ]}
      />
    </ModalForm>
  );
};