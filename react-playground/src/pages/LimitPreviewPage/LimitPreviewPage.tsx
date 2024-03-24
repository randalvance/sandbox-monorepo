import { useState } from 'react';
import { Button, Flex, Space, Upload, Switch, Card } from 'antd';
import { UploadOutlined, FileUnknownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import { PreviewTable } from './components/PreviewTable';

interface LimitPreviewPeriod {
    id: string;
    startDate: Date;
    endDate: Date;
}

const periods: LimitPreviewPeriod[] = [
    {
        id: '1',
        startDate: new Date('2022-10-01'),
        endDate: new Date('2022-12-31')
    },
    {
        id: '2',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-03-31')
    },
    {
        id: '3',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2023-06-30')
    }
];

const formatDate = (date: Date) => dayjs(date).format('D MMM YYYY');

export const LimitPreviewPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

    return (
        <Card>
            <h1>Limit Preview Page</h1>
            <Flex>
                <Flex justify="space-between" css={css`width: 100%`}>
                    <Flex align="start" flex="1">
                        Periods:
                        <Flex css={css`max-width: 80%; overflow-x: auto`}>
                            <Space>
                                {periods.map((period, index) => (
                                    <Button key={index} type={selectedPeriod ===  period.id ? 'primary' : 'default'} size="small" onClick={() => setSelectedPeriod(period.id)}>
                                        {}
                                        {formatDate(period.startDate)} - {formatDate(period.endDate)}
                                    </Button>
                                ))}
                            </Space>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Space>
                            <Upload>
                                <Button icon={<UploadOutlined />}>Upload File</Button>
                            </Upload>
                            <Button icon={<FileUnknownOutlined />}>Add Tasks</Button>
                        </Space>
                    </Flex>
                </Flex>
            </Flex>
            <Flex justify="space-between" css={css`margin-top: 15px`}>
                <div css={css`font-size: 0.8rem; flex-grow: 0`}>
                    Note: Limit values are in millions (USD {getUnicodeFlagIcon('US')})
                </div>
                <div css={css`flex-grow: 0`}>
                    <Switch value={true} /> Detailed View
                </div>
            </Flex>
            <PreviewTable />
        </Card>
    )
}