import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { ScoringCriteria } from '@/services/apiList/scoringCriteria';

type FormProps = {
  onCancel: () => void;
  onFinish: (values: ScoringCriteria) => Promise<void>;
  visible: boolean;
  record: ScoringCriteria | null;
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
        label="名称"
        placeholder="名称"
        rules={[
          {
            required: true,
            message: '名称不能为空',
          },
        ]}
      />
      <ProFormTextArea
        fieldProps={{ autoSize: { minRows: 10, maxRows: 16 } }}
        name="content"
        label="评分标准"
        placeholder="评分标准"
        rules={[
          {
            required: true,
            message: '评分标准不能为空',
          },
        ]}
      />
    </ModalForm>
  );
};
