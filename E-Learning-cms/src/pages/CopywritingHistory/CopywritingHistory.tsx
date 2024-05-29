import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import CreateForm from './CreateForm';

import { add, update, list } from '@/services/apiList/copywritingHistory';

export const CopywritingHistoryList = () => {
  const actionRef = useRef<ActionType>();
  const [createModal, setCreateModal] = useState<boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '场景',
      dataIndex: ['copywriting', 'scene'],
      valueType: 'text',
    },
    {
      title: '用户输入',
      width: '300px',
      ellipsis: true,
      tooltip: true,
      dataIndex: 'prompt',
      valueType: 'text',
    },
    {
      title: '生成结果',
      ellipsis: true,
      tooltip: true,
      dataIndex: 'result',
      valueType: 'text',
    },
    {
      title: '模型',
      dataIndex: ['copywriting', 'LLM_type'],
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
        <Popconfirm
          key="delete"
          title="确定要重新生成吗？"
          onConfirm={async () => {
            await update(record._id);
          }}
        >
          <a>重新生成</a>
        </Popconfirm>,
      ],
    },
  ];

  const handleAddOrUpdate = async (props: SystemPrompt) => {
    await add(props);
    setCreateModal(false);
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
      />
    </PageContainer>
  );
};

export default CopywritingHistoryList;
