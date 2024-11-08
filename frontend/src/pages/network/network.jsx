import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "antd";
import { LoadingOutlined, PlayCircleFilled, PauseCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";

import useEffectSkipMount from '../../hooks/useEffectSkipMount';
import AppHeader from "../../components/app-header/app-header";
import Input from "../../components/input/input";
import DeviceInfo from "../../components/network/device-info";
import {
	fetchListDevices,
	changeSelectedDevice,
	fetchDevice,
	saveDevice,
	fetchDeviceCondition,
	changeDeviceCondition,
	clearSlice
} from '../../services/slices/network';

import styles from "./network.module.scss";

const Network = ({ headerTitle }) => {
	const dispatch = useDispatch();
	const { control, handleSubmit, reset } = useForm();
	const { 
		listDevices,
		selectedDeviceName,
		device,
		deviceCondition,
		featchDeviceConditionStatus,
		featchDeviceConditionError
	} = useSelector((store) => store.network);

	useEffect(() => {
		dispatch(fetchListDevices());
		dispatch(fetchDeviceCondition());

		return () => dispatch(clearSlice());
		// eslint-disable-next-line
	}, []);

	useEffectSkipMount(() => {
		dispatch(fetchDevice({selectedDeviceName}));
	}, [selectedDeviceName]);

	useEffect(() => {
		reset(device);
		// eslint-disable-next-line
	}, [device])

	const onSubmit = (data) => {
		const device = {
			id: data.device,
			ipv4: data.ipv4,
			protocol: data.protocol,
		}
		console.log(device);
		
		// dispatch(saveDevice({ device }))
	};

	return (
		<>
			<AppHeader title={headerTitle} />
			<div className="wrapper">
				<div className={styles.networkPage}>
					<div className={styles.row}>
						<label
							htmlFor="devices"
							className="text_type_main_medium text_bold"
						>
							Устройства:
						</label>
						<Input.Select
							options={listDevices}
							name={"devices"}
							defaultValue={"Не выбран"}
							className={"input"}
							loadingIcon={<LoadingOutlined />}
							onChange={e => dispatch(changeSelectedDevice(e.target.value))}
						/>
					</div>
					<div className={styles.row}>
						<div className="text_type_main_medium text_bold">Статус:</div>
						<DeviceInfo device={device} />
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.row}>
							<label htmlFor="protocol" className="text_type_main_medium text_bold">
								Протоколы:
							</label>
							<Controller
								control={control}
								name={"protocol"}
								render={({ field: { value, onChange } }) => (
									<Input.Select
										name={"protocol"}
										value={value}
										onChange={onChange}
										defaultValue={"Не установлен"}
										className={"input"}
										options={[
											{
												text: "Статичный",
												value: "static",
											},
											{
												text: "Динамичный",
												value: "dynamic",
											},
										]}
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						{/* IPv4 */}
						<div className={styles.row}>
							<label
								htmlFor="ipv4.0.address"
								className="text_type_main_medium text_bold"
							>
								IPv4 адрес:
							</label>
							<Controller
								name={"ipv4.0.address"}
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input.Text
										name={"ipv4.0.address"}
										value={value}
										onChange={onChange}
										placeholder="Введите адрес"
										className='input'
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						{/* IPv4  network */}
						<div className={styles.row}>
							<label
								htmlFor="ipv4.0.netmask"
								className="text_type_main_medium text_bold"
							>
								IPv4 маска:
							</label>
							<Controller
								name={"ipv4.0.netmask"}
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input.Text
										name={"ipv4.0.netmask"}
										value={value}
										onChange={onChange}
										placeholder="Введите маску"
										className='input'
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						<div className={styles.row}>
							<label
								htmlFor="ipv4.0.gateway"
								className="text_type_main_medium text_bold"
							>
								IPv4 шлюз:
							</label>
							<Controller
								name={"ipv4.0.gateway"}
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input.Text
										name={"ipv4.0.gateway"}
										value={value}
										onChange={onChange}
										placeholder="Введите шлюз"
										className='input'
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						<div className={styles.row}>
							<label
								htmlFor="ipv4.0.broadcast"
								className="text_type_main_medium text_bold"
							>
								IPv4 диапазон <br />
								широковешания:
							</label>
							<Controller
								name={"ipv4.0.broadcast"}
								control={control}
								render={({ field: { value, onChange } }) => (
									<Input.Text
										name={"ipv4.0.broadcast"}
										value={value}
										onChange={onChange}
										placeholder="Введите диапазон широковешания"
										className='input'
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						<footer className={styles.footer}>
							<div className="wrapper">
								<Flex align="center" justify="space-between">
									<button type="submit" className="btn-green">
										Отправить
									</button>
									<Flex align="center" justify="flex-end">
										<div className={`text_type_main_default mr-6 ${styles.processStatus}`}>
											<span className="mr-4">Статус процесса:</span>
											{
												!featchDeviceConditionError && (
													featchDeviceConditionStatus === 'pending' ? (
														<LoadingOutlined style={{fontSize: 16}}/>
													) : (
														deviceCondition && (
															<span>{deviceCondition}</span>
														)
													)
												)
											}
										</div>
										<button type="button" className="btn-green mr-6">
											<PlayCircleFilled style={{fontSize: 18}}/>
										</button>
										<button type="button" className="btn-green mr-6">
											<PauseCircleFilled  style={{fontSize: 18}}/>
										</button>
										<button type="button" className="btn-red">
											<ReloadOutlined  style={{fontSize: 18}}/>
										</button>
									</Flex>
								</Flex>
							</div>
						</footer>
					</form>
				</div>
			</div>
		</>
	);
};

export default Network;
