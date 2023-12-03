import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountdownCard from "../../components/CountdownCard";
import {
	CalculatorIcon,
	CaretDownBase,
	CaretDownBase2,
	ClearIcon,
	ExchangeIcon,
	ShareLink,
} from "../../components/Icon";

const CompoundCard = ({ img1, img2 }) => {
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
					<div className="atropine-top mb-0 pb-1">
						<div className="d-flex align-items-start justify-content-between">
							<div className="position-relative">
								<img src={img1} alt="" />
								<button className="no-gutter reverse-btn">
									<ExchangeIcon />
								</button>
							</div>
							<div className="text-end">
								<h6 className="name">PINE-pDAI</h6>
								<div className="btn btn-outline-base me-1">0.1%</div>
								<div className="btn btn-base">4x</div>
							</div>
						</div>
						<ul className="top-info mt-3">
							<li>
								<span>APY:</span>
								<span>199.46%</span>
							</li>
							<li className="apy-value"></li>
							<li>
								<span>Daily APR:</span>
								<span>199.46%</span>
							</li>
						</ul>
					</div>
					<div className="atropine-middle poppins">
						<div className="pt-1">
							<div className="txt1">
								<span
									className="text-base"
									style={{ transform: "translateY(2px)" }}
								>
									LP STAKED
								</span>{" "}
								<span
									className="cursor-pointer"
									onClick={() => setShow(true)}
								>
									<CalculatorIcon />
								</span>
							</div>
							<div className="txt5 font-medium">16,384.55</div>
							<div className="text-base">$6,423.10</div>
						</div>
						<div className="text-end align-self-center">
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
											className="harvest-button no-gutter w-40px flex-grow-1"
											type="button"
											onClick={() => setShakeModalShow("stake")}
										>
											+
										</button>
										<button
											className="harvest-button no-gutter w-40px flex-grow-1"
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
					<div className="d-flex justify-content-between fs-12 font-medium mb-2 poppins">
						<span>Last Compound:</span>
						<CountdownCard targetDate={`October 30, 2050 00:00:00`} />
					</div>
					{/* <button className="cmn-btn w-100 font-bold" type="button">
						Approve Contract
					</button> */}
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
							onClick={() => setShow(null)}
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
							onClick={() => setShakeModalShow(null)}
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

export default CompoundCard;
