import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../components/app-header/app-header";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { getDevices, getDeviceFeatures, saveDeviceFeatures, SET_DEFAULT_SLICE_STATE } from "../../services/actions/network";
import { useForm, useWatch, Controller } from "react-hook-form";
import Input from "../../components/input/input";
import DeviceInfo from "../../components/network/device-info";

import styles from "./network.module.scss";

const Network = ({ headerTitle }) => {
	const dispatch = useDispatch();
	const { control, handleSubmit, reset } = useForm();
	const {
		device,
		deviceFeaturesRequest,
		listDevices,
		devicesListRequest,
	} = useSelector((store) => store.network);

	const watchProtocolValue = useWatch({
		control,
		name: 'protocol',
	})

	useEffect(() => {
		dispatch(getDevices());

		return () => dispatch({ type: SET_DEFAULT_SLICE_STATE })
	}, []);

	useEffect(() => {
		reset(device);
	}, [reset, device]);

	const onSubmit = (data) => {
		const newData = {
			id: data.device,
			ipv4: [{
				...data.ipv4[0]
			}],
			protocol: data.protocol
		}
		dispatch(saveDeviceFeatures(newData))
	};

	const changeDevice = (e) => {
		const selectedDevice = e.target.value;
		dispatch(getDeviceFeatures(selectedDevice));
	};

	const hasDevice = device !== null;
	const isFormUploading = deviceFeaturesRequest;
	const isFormDisabled =
		isFormUploading ||
		!hasDevice

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
							loading={devicesListRequest}
							loadingIcon={<LoadingOutlined />}
							disabled={devicesListRequest}
							onChange={changeDevice}
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
										disabled={isFormDisabled}
										loading={isFormUploading}
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
										disabled={isFormDisabled || watchProtocolValue === 'dynamic'}
										loading={isFormUploading}
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
										disabled={isFormDisabled || watchProtocolValue === 'dynamic'}
										loading={isFormUploading}
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
										disabled={isFormDisabled || watchProtocolValue === 'dynamic'}
										loading={isFormUploading}
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
										disabled={isFormDisabled || watchProtocolValue === 'dynamic'}
										loading={isFormUploading}
										loadingIcon={<LoadingOutlined />}
									/>
								)}
							/>
						</div>
						<footer className={styles.footer}>
							<div className="wrapper">
								<Flex align="center">
									<button type="submit" className="btn-green">
										Отправить
									</button>
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
