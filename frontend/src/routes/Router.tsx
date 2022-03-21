import FindPassword from "pages/account/find-pw/FindPassword";
import SignIn from "pages/account/signin/SignIn";
import SignUp from "pages/account/signup/SignUp";
import KaKaoLoginPage from "pages/account/socialogin/KaKaoLoginPage";
import PageNotFoundPage from "pages/pagenotfound/PageNotFoundPage";
import PerfumeDetail from "pages/perfume/PerfumeDetail";
import Recommend from "pages/recommend/Recommend";
import Survey from "pages/recommend/Survey";
import SurveyResult from "pages/recommend/SurveyResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" />
				<Route path="/perfume/:perfumeId" element={<PerfumeDetail />} />
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/survey" element={<Survey />} />
				<Route path="/survey/result" element={<SurveyResult />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/find-password" element={<FindPassword />} />
				<Route path="/login/oauth2/code/kakao" element={<KaKaoLoginPage />} />
				<Route path="/*" element={<PageNotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
