import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';

import { Copywriting } from '@/services/apiList/copywriting';
import { list } from '@/services/apiList/scoringCriteria';

type FormProps = {
  onCancel: () => void;
  onFinish: (values: Copywriting) => Promise<void>;
  visible: boolean;
  record: Copywriting | null;
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
      initialValues={
        record
          ? { ...record, scoringCriteria: record.scoringCriteria?._id }
          : {}
      }
      submitTimeout={2000}
      onFinish={onFinish}
    >
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
      <ProFormText
        name="guide"
        label="引导语"
        placeholder="引导语"
        rules={[
          {
            required: true,
            message: '引导语不能为空',
          },
        ]}
      />
      <ProFormTextArea
        fieldProps={{ autoSize: { minRows: 4, maxRows: 10 } }}
        name="conclusion"
        label="结束语"
        placeholder="结束语"
        rules={[
          {
            required: true,
            message: '结束语不能为空',
          },
        ]}
      />
      <ProFormSelect
        name="scoringCriteria"
        label="评分标准"
        fieldProps={{ showSearch: true }}
        request={async ({ keyWords }) => {
          const scoringCriterias = await list({ name: keyWords });
          return scoringCriterias?.data.map((item: any) => ({
            label: item.name,
            value: item._id,
          }));
        }}
        rules={[
          {
            required: true,
            message: '评分标准不能为空',
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
    </ModalForm>
  );
};
