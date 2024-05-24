import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Tag, Popconfirm, message } from 'antd';
import { useRef, useState } from 'react';

import CreateForm from './CreateForm';

import {
  add,
  update,
  remove,
  list,
  SystemPrompt,
  enable,
  disable,
} from '@/services/apiList/systemPrompts';

export const SystemPromptList = () => {
  const actionRef = useRef<ActionType>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [record, setRecord] = useState<SystemPrompt | null>(null);

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: 'Scene',
      dataIndex: 'scene',
      valueType: 'text',
    },
    {
      title: 'Fields',
      dataIndex: 'fields',
      valueType: 'text',
      width: '200px',
      search: false,
      render: (_, record) =>
        record.fields?.map((item: string) => (
          <Tag key={record._id + item}>{item}</Tag>
        )),
    },
    {
      title: 'prompt',
      dataIndex: 'prompt',
      width: '500px',
      valueType: 'text',
    },
    {
      title: 'Disable',
      dataIndex: 'disable',
      width: '60px',
      render: (_, record) => (record.disable ? 'Y' : 'N'),
    },
    {
      title: '模型',
      dataIndex: 'LLM_type',
      valueType: 'text',
      render: (_, record) => (record.LLM_type ? record.LLM_type : 'TONG_YI'),
    },
    {
      title: '创建时间',
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
        <a
          key="add"
          onClick={async () => {
            if (record.disable) {
              console.log(22);
              await enable(record._id);
            } else {
              await disable(record._id);
            }
            actionRef.current?.reload();
          }}
        >
          {record.disable ? '启用' : '禁用'}
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
      <ProTable<API.CompanyListItem, API.PageParams>
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

export default SystemPromptList;
