import {
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { list } from '@/services/apiList/copywriting';
import { CopywritingHistory } from '@/services/apiList/copywritingHistory';

type FormProps = {
  onCancel: () => void;
  onFinish: (values: CopywritingHistory) => Promise<void>;
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
        label="用户输入"
        placeholder="用户输入"
        rules={[
          {
            required: true,
            message: '用户输入不能为空',
          },
        ]}
      />
      <ProFormSelect
        name="scene"
        label="场景"
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
            message: '场景不能为空',
          },
        ]}
      />
    </ModalForm>
  );
};
