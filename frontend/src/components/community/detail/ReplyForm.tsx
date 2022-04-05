import communityApi from "apis/community";
import { CreateButton } from "components/button/Button";
import { FormContainer } from "components/review/Container";
import useReviewForm from "components/review/hooks/useReviewForm";
import Textarea from "components/review/Textarea";

interface ReplyFormProps {
	articleId: number;
	commentId: number;
	setReply: React.Dispatch<React.SetStateAction<number>>;
}

function ReplyForm({ articleId, commentId, setReply }: ReplyFormProps) {
	const { handleInputChange, handleFormSubmit, content } = useReviewForm({
		sendReviewData: () => {
			return communityApi.createReply(articleId, commentId, { content });
		},
	});

	const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
		await handleFormSubmit(e);
		setReply(-1);
	};

	return (
		<FormContainer onSubmit={handleSubmitReview}>
			<Textarea
				placeholder="답글을 입력하세요"
				value={content}
				onChange={handleInputChange}
			></Textarea>
			<CreateButton>작성</CreateButton>
		</FormContainer>
	);
}

export default ReplyForm;
