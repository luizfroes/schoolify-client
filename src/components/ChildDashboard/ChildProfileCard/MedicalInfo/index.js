import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const MedicalInfo = ({ childData }) => {
	return (
		<Stack spacing={2} sx={{ textAlign: 'center', mt: 4 }}>
			<Typography variant="subtitle1" gutterBottom>
				Medical Requirements:
			</Typography>

			<Typography variant="subtitle2" gutterBottom>
				Allergies:
			</Typography>
			<Box direction="column">
				{childData?.medical?.allergies?.map((allergy, index) => {
					return <Chip label={allergy} key={index} />;
				})}
			</Box>
			<Typography variant="subtitle2" gutterBottom>
				Disabilities:
			</Typography>
			<Box direction="column">
				{childData?.medical?.disabilities?.map((disability, index) => {
					return <Chip label={disability} key={index} />;
				})}
			</Box>
			<Typography variant="subtitle2" gutterBottom>
				Medication:
			</Typography>
			<Box direction="column">
				{childData?.medical?.medications?.map((medication, index) => {
					return <Chip label={medication} key={index} />;
				})}
			</Box>
		</Stack>
	);
};
