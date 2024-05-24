import {
  ModalForm,
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
        name="scene"
        label="Scene"
        fieldProps={{ showSearch: true }}
        request={async ({ keyWords }) => {
          const systemPrompts = await list({ scene: keyWords });
          return systemPrompts?.data.map((item: any) => ({
            label: item.scene,
            value: item.scene,
          }));
        }}
        rules={[
          {
            required: true,
            message: 'SystemPrompt不能为空',
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
      />
    </ModalForm>
  );
};
