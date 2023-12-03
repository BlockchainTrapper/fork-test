import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	CalculatorIcon,
	CaretDownBase,
	CaretDownBase2,
	ClearIcon,
	ShareLink,
} from "../../components/Icon";

const AtropineFarmCard = ({ img, name }) => {
	const [show, setShow] = React.useState(false);
	const [shakeModalShow, setShakeModalShow] = React.useState(null);
	const [detailsShow, setDetailsShow] = React.useState(false);
	const [staking, setStaking] = React.useState(false);
	const [approved, setApproved] = React.useState(false);
	return (
		<>
			<div className="contract-card atropine-card h-auto">
				<div className="shape1"></div>
				<div className="shape2"></div>
				<div className="shape3"></div>
				<div className="shape4"></div>
				<div className="innerdiv">
					<div className="atropine-top mb-0">
						<div className="d-flex align-items-start justify-content-between">
							<img src={img} alt="" />
							<div className="text-end">
								<h6 className="name">{name}</h6>
								<div className="btn btn-outline-base me-1">No Fees</div>
								<div className="btn btn-base">4x</div>
							</div>
						</div>
						<ul className="top-info mt-3">
							<li>
								<span>APR:</span>
								<span className="d-flex align-items-center gap-2">
									<span
										className="cursor-pointer"
										onClick={() => setShow(true)}
									>
										<CalculatorIcon />
									</span>
									<span style={{ transform: "translateY(2px)" }}>
										199.46%
									</span>
								</span>
							</li>
							<li className="apy-value"></li>
							<li>
								<span>Earn:</span>
								<strong className="text-base">PINE</strong>
							</li>
						</ul>
					</div>
					<div className="atropine-middle poppins">
						<div className="pt-3">
							<div className="txt1">
								<strong className="text-base">PINE</strong> Earned
							</div>
							<div className="txt5">0</div>
							<div className="text-base">$0.00</div>
							<div className="txt1">
								<strong className="text-base">DAI-PLS</strong> STAKED
							</div>
						</div>
						<div className="text-end align-self-center">
							<div>
								<button
									className="harvest-button no-gutter mb-2"
									type="button"
								>
									Harvest
								</button>
							</div>
							{approved && !staking && (
								<button
									className="cmn-btn"
									type="button"
									onClick={() => setStaking(!staking)}
									style={{
										paddingInline: "22px",
										minWidth: "0",
										width: "auto",
										borderRadius: "5px",
									}}
								>
									Stake LP
								</button>
							)}
							{staking && (
								<>
									<div className="d-flex gap-1">
										<button
											className="harvest-button no-gutter w-auto flex-grow-1"
											type="button"
											onClick={() => setShakeModalShow("stake")}
										>
											+
										</button>
										<button
											className="harvest-button no-gutter w-auto flex-grow-1"
											type="button"
											onClick={() => setShakeModalShow("unstake")}
										>
											-
										</button>
									</div>
								</>
							)}
						</div>
					</div>
					{!approved && (
						<button
							className="cmn-btn w-100 font-bold"
							type="button"
							onClick={() => setApproved(!approved)}
						>
							{staking ? "Stake LP button" : "APPROVE CONTRACT"}
						</button>
					)}
					<div className="hrr"></div>
					<button
						className="details-button no-gutter"
						onClick={() => setDetailsShow(!detailsShow)}
					>
						{!detailsShow ? "Details" : "Hide"}
						{!detailsShow ? <CaretDownBase /> : <CaretDownBase2 />}
					</button>
					{detailsShow && (
						<>
							<div className="details-txt">
								<div className="mb-1">
									Stake: PINE-ATROPA LP
									<Link to="#" className="text-base hover-text-base">
										{" "}
										<ShareLink />
									</Link>
								</div>
								<div className="mb-1">
									Total Liquidity:{" "}
									<span className="text-base">$159,432.45</span>{" "}
								</div>
								<Link to="#" className="text-base hover-text-base">
									View on PulseX
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
			<Modal centered show={show} onHide={() => setShow(false)}>
				<div className="modal-inner">
					<div className="shape1"></div>
					<div className="shape2"></div>
					<div className="shape3"></div>
					<div className="shape4"></div>
					<ModalHeader>
						<span>ROI Calculator</span>
						<span
							style={{ cursor: "pointer" }}
							onClick={() => setShow(false)}
						>
							<ClearIcon />
						</span>
					</ModalHeader>
					<ModalBody>
						<table className="table __table">
							<thead>
								<tr>
									<th>Timeframe</th>
									<th>ROI</th>
									<th>PINE PER $1000</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1 Day</td>
									<td>1.08%</td>
									<td>118.59</td>
								</tr>
								<tr>
									<td>7 Days</td>
									<td>7.83%</td>
									<td>857.49</td>
								</tr>
								<tr>
									<td>30 Days</td>
									<td>38.16%</td>
									<td>4177.49</td>
								</tr>
								<tr>
									<td>365 Days</td>
									<td>5003.38%</td>
									<td>547783.33</td>
								</tr>
							</tbody>
						</table>
						<div className="roi-text">
							Calculated based on current rates. Compounding once daily.
							Rates are estimates provided for your convenience only, and
							by no means represent guaranteed returns.
						</div>
						<div className="text-center">
							<button type="button" className="cmn-btn btn-sm">
								Get PINE-ATROPA LP
							</button>
						</div>
					</ModalBody>
				</div>
			</Modal>
			<Modal
				centered
				show={shakeModalShow}
				onHide={() => setShakeModalShow(null)}
			>
				<div className="modal-inner">
					<div className="shape1"></div>
					<div className="shape2"></div>
					<div className="shape3"></div>
					<div className="shape4"></div>
					<ModalHeader>
						<span className="text-base">
							{shakeModalShow === "stake"
								? "Stake PINE-ATROPA LP"
								: "Unstake PINE-ATROPA LP"}
						</span>
						<span
							style={{ cursor: "pointer" }}
							onClick={() => setShakeModalShow(false)}
						>
							<ClearIcon color="var(--base)" />
						</span>
					</ModalHeader>
					<ModalBody>
						<form>
							<div className="text-end fs-14 mb-11">
								0 PINE Available
							</div>
							<div className="stake-form-group">
								<input
									type="number"
									className="form-control form--control"
									placeholder="0"
								/>
								<button className="max no-gutter text-white">
									Max
								</button>
							</div>
							<div className="d-flex flex-wrap justify-content-around pt-4">
								<button
									className="cmn-btn btn-outline w-auto px-4"
									type="button"
									onClick={() => setShakeModalShow(null)}
								>
									Cancel
								</button>
								<button className="cmn-btn w-auto px-4" type="submit">
									Confirm
								</button>
							</div>
							<div className="text-center pt-4 poppins">
								<div className="pt-2">
									<Link to="#" className="text-base hover-text-base">
										Get PINE-ATROPA LP <ShareLink />
									</Link>
								</div>
							</div>
						</form>
					</ModalBody>
				</div>
			</Modal>
		</>
	);
};

export default AtropineFarmCard;
