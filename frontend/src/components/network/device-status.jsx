import React from 'react';
import { Flex } from 'antd';

const DeviceStatus = ({device}) => {
    return (
        <div>
            <div>
                <Flex align='center' justify='space-between'>
                    <div>Device:</div>
                    <div>{device.device}</div>
                </Flex>
                <Flex align='center' justify='space-between'>
                    <div>Uptime:</div>
                    <div>{device.uptime}</div>
                </Flex>
                <Flex align='center' justify='space-between'>
                    <div>MAC:</div>
                    <div>{device.mac}</div>
                </Flex>
                <Flex align='center' justify='space-between'>
                    <div>RX:</div>
                    <div>{device.rx}</div>
                </Flex>
                <Flex align='center' justify='space-between'>
                    <div>TX:</div>
                    <div>{device.tx}</div>
                </Flex>
                <Flex align='center' justify='space-between'>
                    <div>Ipv4:</div>
                    <div>{device.ipv4.address}</div>
                </Flex>
            </div>
        </div>
    );
}

export default DeviceStatus;
