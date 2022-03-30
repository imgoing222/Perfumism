import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
	perfume_id: number;
	perfume_name: string;
	image: string;
	average_grade: number;
	likes: number;
	brand: {
		brand_id: number;
		brand_name: string;
	};
}

interface Perfume {
	perfume: Props;
}

function MonthPerfume({ perfume }: Perfume) {
	return (
		<Container to={`perfume/${perfume.perfume_id}`}>
			<Image src={perfume.image} />
			<PerfumeName>{perfume.perfume_name}</PerfumeName>
			<BrandAndGrade>
				{perfume.brand.brand_name} {perfume.average_grade}
			</BrandAndGrade>
		</Container>
	);
}

export default MonthPerfume;

const Container = styled(Link)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	position: relative;
	color: #000;
	width: 100%;
`;

const Image = styled.img`
	width: 20rem;
	height: 30rem;
`;

const PerfumeName = styled.p`
	font-size: 2rem;
	font-weight: 800;
`;

const BrandAndGrade = styled.p`
	font-size: 1.3rem;
`;
