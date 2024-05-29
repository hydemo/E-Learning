import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { useRef, useState } from 'react';

import CreateForm from './CreateForm';

import {
  add,
  update,
  remove,
  list,
  OptimizeQuestions,
} from '@/services/apiList/optimizeQuestions';

export const OptimizeQuestionsList = () => {
  const actionRef = useRef<ActionType>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [record, setRecord] = useState<OptimizeQuestions | null>(null);

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '引导语',
      width: '300px',
      ellipsis: true,
      tooltip: true,
      dataIndex: 'guide',
      valueType: 'text',
    },
    {
      title: '评分标准',
      dataIndex: ['scoringCriteria', 'name'],
      valueType: 'text',
    },
    {
      title: '结束语',
      width: '300px',
      ellipsis: true,
      tooltip: true,
      dataIndex: 'conclusion',
      valueType: 'text',
    },
    {
      title: '模型',
      dataIndex: 'LLM_type',
      valueType: 'text',
      render: (_, record) => (record.LLM_type ? record.LLM_type : 'TONG_YI'),
    },
    {
      title: '创建时间',
      width: '100px',
      dataIndex: 'createdAt',
      valueType: 'date',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: any) => [
        <a
          key="add"
          onClick={() => {
            setCreateModal(true);
            setRecord(record);
          }}
        >
          修改
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除吗？"
          onConfirm={async () => {
            const res: any = await remove(record._id);
            if (res) {
              message.success('删除成功');
              actionRef.current?.reload();
            }
          }}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleAddOrUpdate = async (props: SystemPrompt) => {
    if (record) {
      await update(record._id, props);
    } else {
      await add(props);
    }
    setCreateModal(false);
    setRecord(null);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<any>
        actionRef={actionRef}
        rowKey="_id"
        request={list}
        columns={columns}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateModal(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateForm
        onCancel={() => setCreateModal(false)}
        onFinish={handleAddOrUpdate}
        visible={createModal}
        record={record}
      />
    </PageContainer>
  );
};

export default OptimizeQuestionsList;
