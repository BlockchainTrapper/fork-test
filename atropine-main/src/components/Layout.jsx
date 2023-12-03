import React, { useEffect, useState } from "react";
import { Collapse, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import img from "../assets/img/body-bg.png";
import oxGaurd from "../assets/img/guard.png";
import logo from "../assets/img/sidebar-logo.png";
import tech from "../assets/img/tech-rate.png";

import {
	BinanceIcon,
	CaretDown,
	ClearIcon,
	CopyButton,
	FarmsIcon,
	Favicon,
	Hamburger,
	HomeIcon,
	InfoIcon,
	MathWalletIcon,
	MetamaskIcon,
	MoreIcon,
	SafePalWalletIcon,
	ShareLink,
	Telegram,
	TokenPocketIcon,
	Tradeicon,
	TrustWalletIcon,
	Twitter,
	WalletConnectIcon,
} from "./Icon";
const Layout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = React.useState(false);
	const [connectModal, setConnectModal] = React.useState(false);
	const [wallet, setWallet] = React.useState(null);
	const [walletModal, setWalletModal] = React.useState(false);

	const handleCopyWalletAddress = () => {
		navigator.clipboard.writeText("0xdfdsDDCD34234fsfsdfx");
		window.alert("Copied to clipboard");
	};

	return (
		<main
			className="layout-section"
			style={{
				background: `url(${img}) no-repeat center center / cover fixed`,
			}}
		>
			<aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
				<button
					className="no-gutter bar-icon"
					type="button"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<Hamburger />
				</button>
				<div className="text-end mt-3 px-3 text-white d-lg-none">
					<button
						className="no-gutter"
						type="button"
						onClick={() => setSidebarOpen(false)}
					>
						<ClearIcon />
					</button>
				</div>
				<div className="sidebar-logo">
					<Link to="/">
						<img src={logo} alt="" />
					</Link>
				</div>
				<ul className="sidebar-menu mb-5">
					{sidebarmenu.map((item, index) => (
						<li key={index}>
							<CustomMenuItem
								setSidebarOpen={setSidebarOpen}
								item={item}
							/>
						</li>
					))}
				</ul>
				<div className="mt-auto text-center audited-by pe-3">
					<div className="mb-3" style={{ color: "#B0DA59" }}>
						Audited by
					</div>
					<div>
						<Link
							to="https://github.com/0xGuard-com/audit-reports/blob/master/Atropine/Atropine.pdf"
							target="_blank"
						>
							<img
								src={oxGaurd}
								className="mw-100"
								style={{ width: "160px" }}
								alt=""
							/>
						</Link>
						<Link
							to="https://github.com/TechRate/Smart-Contract-Audits/blob/main/October_2023/AtropineContracts.pdf"
							target="_blank"
						>
							<img
								src={tech}
								className="mw-100"
								style={{ width: "160px" }}
								alt=""
							/>
						</Link>
					</div>
				</div>
				<div className="sidebar-bottom">
					<button
						className="no-gutter cog w-100 text-center text-white"
						type="button"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							width="24"
						>
							<path
								fillRule="evenodd"
								d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<div className="inner">
						<span className="balance">
							<Favicon />
							<span>$0.0002</span>
						</span>
						<Link to="">
							<Telegram />
						</Link>
						<Link to="">
							<Twitter />
						</Link>
					</div>
				</div>
			</aside>
			<article className="article">
				{!wallet ? (
					<button
						className="connect-btn d-none d-lg-block cmn-btn"
						type="button"
						onClick={() => setConnectModal(!connectModal)}
					>
						Connect
					</button>
				) : (
					<button
						className="connect-btn active d-none d-lg-block cmn-btn"
						type="button"
						onClick={() => setWalletModal(!walletModal)}
					>
						{wallet}
					</button>
				)}
				<nav className="nav-header d-lg-none">
					<div
						className="container main-container"
						style={{ paddingInline: "24px" }}
					>
						<div className="d-flex align-items-center justify-content-between">
							<div className="logo">
								<Link to="/">
									<img src={logo} alt="" />
								</Link>
							</div>
							{!wallet ? (
								<button
									className="connect-btn cmn-btn ms-auto me-2"
									type="button"
									onClick={() => setConnectModal(!connectModal)}
								>
									Connect
								</button>
							) : (
								<button
									className="connect-btn active cmn-btn ms-auto me-2"
									type="button"
									onClick={() => setWalletModal(!walletModal)}
								>
									{wallet}
								</button>
							)}
							<button
								className="hamburger no-gutter"
								onClick={() => setSidebarOpen(!sidebarOpen)}
							>
								<Hamburger />
							</button>
						</div>
					</div>
				</nav>
				<div
					className="container main-container pt-5 pt-lg-0"
					style={{ paddingInline: "24px" }}
				>
					{children}
				</div>
				<Modal
					centered
					show={connectModal}
					onHide={() => setConnectModal(null)}
				>
					<div className="modal-inner">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<ModalHeader>
							<h6
								className="m-0"
								style={{ fontWeight: "500 !important" }}
							>
								Connect to a wallet
							</h6>
							<span
								style={{ cursor: "pointer" }}
								onClick={() => setConnectModal(false)}
							>
								<ClearIcon color="var(--base)" />
							</span>
						</ModalHeader>
						<ModalBody>
							<div className="wallet-button-group">
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>Metamask</span>
									<MetamaskIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>TrueWallet</span>
									<TrustWalletIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>MathWallet</span>
									<MathWalletIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>TokenPocket</span>
									<TokenPocketIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>WalletConnect</span>
									<WalletConnectIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>Binance</span>
									<BinanceIcon />
								</button>
								<button
									className="wallet-btn"
									onClick={() => {
										setWallet("0x63u4m45");
										setConnectModal(false);
									}}
								>
									<span>SafePalWallet</span>
									<SafePalWalletIcon />
								</button>
							</div>
						</ModalBody>
					</div>
				</Modal>
				<Modal
					centered
					show={walletModal}
					onHide={() => setWalletModal(null)}
				>
					<div className="modal-inner">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<ModalHeader>
							<h6
								className="m-0"
								style={{ fontWeight: "500 !important" }}
							>
								Your wallet
							</h6>
							<span
								style={{ cursor: "pointer" }}
								onClick={() => setWalletModal(false)}
							>
								<ClearIcon color="var(--base)" />
							</span>
						</ModalHeader>
						<ModalBody>
							<div className="text-center">
								<h6 className="wallet-address text-start">
									0xdfdsDDCD34234fsfsdfx
								</h6>
								<div className="text-start">
									<Link
										to="#"
										className="text-base hover-text-base me-3"
									>
										View on PulseX <ShareLink />
									</Link>
									<span className="text-base hover-text-base d-inline-flex align-items-center gap-1">
										Copy address
										<button
											className="no-gutter text-base"
											onClick={() => handleCopyWalletAddress()}
										>
											<CopyButton />
										</button>
									</span>
								</div>
								<div className="mt-3">
									<button
										className="active cmn-btn logout-btn ms-auto me-2"
										onClick={() => {
											setWallet(null);
											setWalletModal(false);
										}}
									>
										<span>Logout</span>
									</button>
								</div>
							</div>
						</ModalBody>
					</div>
				</Modal>
			</article>
		</main>
	);
};

const CustomMenuItem = ({ item, setSidebarOpen }) => {
	const location = useLocation();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (item?.submenu) {
			for (const subitem of item.submenu) {
				if (location.pathname === subitem.path) {
					setOpen(true);
					return;
				}
			}
			setOpen(false);
		}
	}, [location.pathname, item?.submenu]);
	return (
		<>
			<NavLink
				to={item.path}
				onClick={() => {
					setOpen(!open);
					// setSidebarOpen(false);
				}}
				target={item?.target ? item?.target : ""}
			>
				<span className="icon">{item?.icon}</span> <span>{item.name}</span>
				<span className="ms-auto">
					{item?.submenu?.length > 0 ? (
						<span
							style={{
								transform: `rotate(${open ? "180deg" : "0deg"})`,
								display: "inline-block",
								transition: "all ease 0.3s",
							}}
						>
							<CaretDown />
						</span>
					) : (
						""
					)}
				</span>
			</NavLink>
			{item?.submenu && (
				<Collapse in={open}>
					<div>
						<ul className="submenu">
							{item?.submenu?.map((subitem, index) => (
								<li key={index}>
									<NavLink
										to={subitem.path}
										target={subitem?.target ? subitem?.target : ""}
									>
										{subitem.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</Collapse>
			)}
		</>
	);
};

const sidebarmenu = [
	{
		icon: <HomeIcon />,
		name: "Home",
		path: "/",
	},
	{
		icon: <Tradeicon />,
		name: "Trade",
		path: "#",
		submenu: [
			{
				name: "Exchange",
				target: "_blank",
				path: "https://app.pulsex.com/swap?inputCurrency=0xCc78A0acDF847A2C1714D2A925bB4477df5d48a6&outputCurrency=0xE846884430D527168B4EAaC80Af9268515D2f0CC",
			},
			{
				name: "Liquidity",
				target: "_blank",
				path: "https://app.pulsex.com/add/V1/0xe846884430d527168b4eaac80af9268515d2f0cc/0xCc78A0acDF847A2C1714D2A925bB4477df5d48a6",
			},
		],
	},
	{
		icon: <FarmsIcon />,
		name: "Farms",
		path: "#",
		submenu: [
			{
				name: "Classic Farm",
				path: "/farm",
			},
			{
				name: "AutoCompound ",
				path: "/autocompound",
			},
		],
	},
	{
		icon: <InfoIcon />,
		name: "Info",
		path: "#",
		submenu: [
			{
				name: "Pulsex",
				target: "_blank",
				path: "https://app.pulsex.com/info/token/0xe846884430d527168b4eaac80af9268515d2f0cc",
			},
			{
				name: "Dexscreener",
				target: "_blank",
				path: "https://dexscreener.com/pulsechain/0x0e4b3d3141608ebc730ee225666fd97c833d553e",
			},
			{
				name: "Pairs",
				target: "_blank",
				path: "https://app.pulsex.com/info/token/0xe846884430d527168b4eaac80af9268515d2f0cc",
			},
		],
	},
	{
		icon: <MoreIcon />,
		name: "More",
		path: "#",
		submenu: [
			{
				name: "GitBook",
				target: "_blank",
				path: "https://atropine.gitbook.io/atropine/",
			},
			{
				name: "Audit Report",
				target: "_blank",
				path: "https://atropine.gitbook.io/atropine/specs/security/audits",
			},
		],
	},
];

export default Layout;
