import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, message, Modal } from 'antd';
import { useRef, useState } from 'react';

import CreateForm from './CreateForm';

import { add, list, refresh, Score } from '@/services/apiList/score';

export const ScoreList = () => {
  const actionRef = useRef<ActionType>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [polling, setPolling] = useState<number | undefined>(5000);
  const [record, setRecord] = useState<Score | null>(null);
  const [resultVisible, setResultVisible] = useState<boolean>(false);

  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: 'System Prompt',
      dataIndex: ['systemPrompt', 'name'],
      valueType: 'text',
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      valueType: 'text',
    },
    {
      title: 'prompt',
      dataIndex: 'prompt',
      valueType: 'text',
      width: '600px',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '评分中...',
          status: 'Processing',
        },
        1: {
          text: '评分成功',
          status: 'Success',
        },
        2: {
          text: '评分失败',
          status: 'Error',
        },
      },
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
            setResultVisible(true);
            setRecord(record);
          }}
        >
          评分结果
        </a>,
        <Popconfirm
          key="refresh"
          title="确定要重新评分吗？"
          onConfirm={async () => {
            const res: any = await refresh(record._id);
            if (res) {
              message.success('评分成功');
              actionRef.current?.reload();
            }
          }}
        >
          <a>重新评分</a>
        </Popconfirm>,
      ],
    },
  ];

  const resultColumn: ProColumns<any>[] = [
    {
      title: 'Field',
      dataIndex: 'field',
      valueType: 'text',
    },
    {
      title: '得分',
      dataIndex: 'score',
      valueType: 'text',
    },
    {
      title: '原因',
      dataIndex: 'description',
      valueType: 'text',
      width: '800px',
    },
  ];

  const handleAdd = async (props: Score) => {
    await add(props);
    setCreateModal(false);
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<API.CompanyListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="_id"
        request={async () => {
          const result = await list();
          const needPolling = result.data.some((v: any) => v.status === 0);
          if (!needPolling && polling) {
            setPolling(undefined);
          } else {
            setPolling(5000);
          }
          return result;
        }}
        columns={columns}
        search={{
          labelWidth: 120,
        }}
        polling={polling}
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
        onFinish={handleAdd}
        visible={createModal}
      />
      <Modal
        width={1200}
        visible={resultVisible}
        onOk={() => setResultVisible(false)}
        onCancel={() => setResultVisible(false)}
      >
        <ProTable<API.any, API.PageParams>
          pagination={false}
          rowKey="filed"
          columns={resultColumn}
          search={false}
          dataSource={record?.result || []}
          toolBarRender={false}
        />
      </Modal>
    </PageContainer>
  );
};

export default ScoreList;
