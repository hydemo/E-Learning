import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { SystemPrompt } from '@/services/apiList/systemPrompts';

type FormProps = {
  onCancel: () => void;
  onFinish: (values: SystemPrompt) => Promise<void>;
  visible: boolean;
  record: SystemPrompt | null;
};

export default (props: FormProps) => {
  const { onFinish, onCancel, visible, record } = props;
  return (
    <ModalForm
      title={record ? '修改' : '新增'}
      autoFocusFirstInput
      visible={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      initialValues={record ? record : {}}
      submitTimeout={2000}
      onFinish={onFinish}
    >
      <ProFormText
        name="name"
        label="Name"
        placeholder="Name"
        rules={[
          {
            required: true,
            message: 'Name不能为空',
          },
        ]}
      />
      <ProFormText
        name="scene"
        label="Scene"
        placeholder="Scene"
        rules={[
          {
            required: true,
            message: 'Scene不能为空',
          },
        ]}
      />
      <ProFormSelect
        name="LLM_type"
        label="模型"
        request={async () => {
          return [
            { label: '通义千问', value: 'TONG_YI' },
            { label: 'Kimi', value: 'KIMI' },
          ];
        }}
        rules={[
          {
            required: true,
            message: '模型不能为空',
          },
        ]}
      />
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
        name="fields"
        label="Fields"
        mode="tags"
        request={async () => {
          return [];
        }}
        rules={[
          {
            required: true,
            message: 'Fields不能为空',
          },
        ]}
      />
    </ModalForm>
  );
};
