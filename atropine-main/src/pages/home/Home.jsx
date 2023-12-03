import React from "react";
import farmingShape from "../../assets/img/farming-shape.png";
import favImg from "../../assets/img/fav-icon.png";
import logo from "../../assets/img/logo.png";
import Layout from "../../components/Layout";
const Home = () => {
	return (
		<Layout>
			<div className="home-top text-base">
				<img src={logo} alt="" />
				<div>
					Fully Decentralized Layered Yield Farm on IPFS & Pulsechain
				</div>
			</div>
			<div className="row g-4" style={{ "--bs-gutter-y": "32px" }}>
				<div className="col-md-6">
					<div className="atropine-card poppins">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<img src={farmingShape} alt="" className="farming-shape" />
						<div className="innerdiv">
							<h2 className="title mb-29">Farming & Staking</h2>
							<img src={favImg} className="mb-17" alt="" />
							<div className="txt1">
								<strong>PINE</strong> to Harvest
							</div>
							<div className="txt2">0.000</div>
							<div className="txt3 mb-2">~$0.00</div>
							<div className="txt1">
								<strong>PINE</strong> in Wallet
							</div>
							<div className="txt4">0.000</div>
							<div className="txt3 mb-21">~$0.00</div>
							<button className="cmn-btn" type="button">
								Harvest All (0)
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="atropine-card poppins">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<div className="innerdiv">
							<div className="mx-2">
								<h2 className="title">Announcements</h2>
								<iframe
									scrolling="no"
									frameBorder={0}
									allowTransparency="true"
									allowFullScreen="true"
									style={{
										position: "static",
										visibility: "visible",
										width: "100%",
										height: "400px",
										display: "block",
										flexGrow: 1,
									}}
									title="Twitter Timeline"
									src="https://syndication.twitter.com/srv/timeline-profile/screen-name/atropinedefi?dnt=false&embedId=twitter-widget-0&features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&frame=false&hideBorder=false&hideFooter=false&hideHeader=false&hideScrollBar=false&lang=en&maxHeight=400px&origin=https%3A%2F%2Fatropine.io%2F&sessionId=eb28c8fa1ade5eb258141e4182e78cefb6ebff00&showHeader=true&showReplies=false&transparent=false&widgetsVersion=01917f4d1d4cb%3A1696883169554"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="atropine-card poppins">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<div className="innerdiv">
							<h2 className="title mb-4">Atropine Stats</h2>
							<ul className="stats-list">
								<li>
									<span className="label">Market Cap</span>
									<span className="value">$2,646,347</span>
								</li>
								<li>
									<span className="label">Total Minted</span>
									<span className="value">1,466,178</span>
								</li>
								<li>
									<span className="label">Total Burned</span>
									<span className="value">243,555</span>
								</li>
								<li>
									<span className="label">Circulating Supply</span>
									<span className="value">743,249</span>
								</li>
								<li>
									<span className="label">New PINE/block</span>
									<span className="value">10</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="atropine-card poppins">
						<div className="shape1"></div>
						<div className="shape2"></div>
						<div className="shape3"></div>
						<div className="shape4"></div>
						<div className="innerdiv">
							<h2 className="title mb-4">Total Value Locked (TVL)</h2>
							<h3 className="amount">$5,683,775.12</h3>
							<div className="amount-slogan">
								Across all Farms and Pools
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;
