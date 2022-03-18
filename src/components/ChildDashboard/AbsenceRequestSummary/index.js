import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ErrorIcon from "@mui/icons-material/Error";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { forms, item, colors, headers } from "../../../styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const stylingRowColor = (status) => {
  if (status === "PENDING") return "lightGray";
  if (status === "APPROVED") return "lightGreen";
  if (status === "REJECTED") return "red";
};

const checkStatus = (absenceRequest) => {
  if (absenceRequest.status === "reject") {
  }
  return true;
};

export const AbsenceRequestSummary = ({ childData }) => {
  console.log(childData);
  return (
    <div>
      <Typography
        className="headingFont"
        variant="h6"
        gutterBottom
        component="div"
        sx={headers.font}
      >
        Absence Requests:
      </Typography>
      {childData?.absenceRequests?.map((absenceRequest, index) => {
        return (
          <Accordion
            disabled
            sx={{ backgroundColor: stylingRowColor(absenceRequest.status) }}
          >
            <AccordionSummary>
              <Typography>
                {absenceRequest.type} {absenceRequest.dateTime}
                {absenceRequest.status}
              </Typography>
            </AccordionSummary>
            {checkStatus(absenceRequest) && (
              <AccordionDetails>
                <Typography>
                  We cannot allow child to have a day off for a family trip, as
                  there are ample opportunities during half term break.
                </Typography>
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}
    </div>
  );
};