import { AxiosResponse } from "axios";
import { request, imageRequest } from "./request";

interface CommunityApiType {
	getCommunityList: (currentPage: number) => Promise<AxiosResponse>;
	getCommunityDetail: (articleId: number) => Promise<AxiosResponse>;
	communityCreate: (formData: FormData) => Promise<AxiosResponse>;
}

const communityApi: CommunityApiType = {
	getCommunityList: (currentPage: number) => request.get(`auth/articles/?page=${currentPage}`),
	getCommunityDetail: (articleId: number) => request.get(`auth/articles/detail/${articleId}`),
	communityCreate: (formData) => imageRequest.post(`auth/articles`, formData),
};

export default communityApi;