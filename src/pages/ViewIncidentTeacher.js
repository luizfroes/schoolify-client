import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import logo from '../assets/img/logoMain.png';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

import { IncidentChannel } from '../components/IncidentChannel';
import { IncidentListDesktop } from '../components/IncidentList/IncidentListDesktop';

import { MOBILE, DESKTOP } from '../media';
import { useMediaQuery } from 'react-responsive';
import { IncidentComment } from '../components/IncidentComment';

import { useState } from 'react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { ADD_INCIDENT_REPORT_COMMENT } from '../graphql/mutations';
import {
	GET_TEACHER_STUDENTS,
	VIEW_INCIDENT_REPORTS,
	VIEW_INCIDENT_REPORT_BY_ID,
} from '../graphql/query';

const styles = {
	paperContainer: {
		margin: '2rem 0',
		borderRadius: '25px',
	},
};

export const ViewIncidentTeacher = () => {
	const isMobile = useMediaQuery(MOBILE);
	const isDesktop = useMediaQuery(DESKTOP);

	const yearGroupId = JSON.parse(localStorage.getItem('user')).yearGroup.id;

	const {
		loading: studentListLoading,
		error: studentListError,
		data: studentList,
	} = useQuery(GET_TEACHER_STUDENTS, {
		variables: {
			yearGroupId: yearGroupId,
		},
		pollInterval: 1000,
	});

	const {
		loading: incidentReportListLoading,
		data: incidentReportList,
		error: incidentReportListError,
		refetch,
	} = useQuery(VIEW_INCIDENT_REPORTS, {
		pollInterval: 1000,
	});

	const [getIncidentReportById] = useLazyQuery(VIEW_INCIDENT_REPORT_BY_ID);

	const [executeAddComment, { error: mutationError }] = useMutation(
		ADD_INCIDENT_REPORT_COMMENT
	);

	const [student, setStudent] = useState();
	const [incidentReportDataById, setIncidentReportDataById] = useState();
	const [showCommentSection, setShowCommentSection] = useState(false);

	const studentIncidents = () => {
		return incidentReportList?.viewIncidentReports?.filter((each) => {
			return each.student.id === student;
		});
	};

	const renderIncidentReportOnClick = async (selectedIncidentId) => {
		const { data } = await getIncidentReportById({
			variables: { incidentReportId: selectedIncidentId },
		});

		if (data?.viewIncidentReport?.id !== incidentReportDataById?.id) {
			setIncidentReportDataById(data.viewIncidentReport);
		}

		setShowCommentSection(true);
	};

	const renderLoading = () => {
		if (studentListLoading && incidentReportListLoading) {
			return <LinearProgress style={{ backgroundColor: 'purple' }} />;
		}
	};

	const renderError = () => {
		if (
			!studentListLoading &&
			studentListError &&
			incidentReportListError &&
			!incidentReportListLoading
		) {
			return (
				<Alert severity='error'>
					Something went wrong, please tray again later.
				</Alert>
			);
		}
	};

	const renderData = () => {
		return (
			<Box component='main' maxWidth='lg'>
				<Paper elevation={6} style={styles.paperContainer}>
					<div className='logoContainer'>
						<img src={logo} className='logo' alt='logo' />
					</div>
					<Grid item xs={12}>
						<Typography
							className='headingFont'
							variant='h3'
							gutterBottom
							component='div'>
							Incident Form
						</Typography>
					</Grid>
					<Grid container>
						<Grid item xs={isDesktop ? 4 : 12}>
							<IncidentListDesktop
								studentList={studentList?.teacherStudents}
								setStudent={setStudent}
								studentIncidents={studentIncidents}
								renderIncidentReportOnClick={renderIncidentReportOnClick}
								student={student}
								setShowCommentSection={setShowCommentSection}
							/>
						</Grid>

						<Grid item xs={isMobile ? 12 : 8}>
							<IncidentChannel
								incidentReportDataById={incidentReportDataById?.id}
								studentIncidents={studentIncidents}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<IncidentComment
							showCommentSection={showCommentSection}
							executeAddComment={executeAddComment}
							incidentReportDataById={incidentReportDataById}
							mutationError={mutationError}
							setIncidentReportDataById={setIncidentReportDataById}
							refetch={refetch}
						/>
					</Grid>
				</Paper>
			</Box>
		);
	};

	return (
		<Box>
			{renderLoading()}
			{renderError()}
			{renderData()}
		</Box>
	);
};
