
import { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormLabel,
  Grid,
  OutlinedInput,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const initialExperience = {
  organisation: '',
  designation: '',
  description: '',
  start_date: '',
  end_date: '',
};

export default function ExperienceSection({
  experiences,
  setExperiences,
}) {
  const [experienceData, setExperienceData] = useState(initialExperience);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExperienceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExperience = () => {
    const {
      organisation,
      designation,
      start_date,
      end_date,
    } = experienceData;

    if (!organisation.trim() || !designation.trim() || !start_date) {
      setError('Please fill in organisation, designation and start date.');
      return;
    }

    if (!currentlyWorking && !end_date) {
      setError('Please enter an end date or select Currently working here.');
      return;
    }

    if (!currentlyWorking && end_date < start_date) {
      setError('End date cannot be earlier than start date.');
      return;
    }

    const newExperience = {
      ...experienceData,
      organisation: organisation.trim(),
      designation: designation.trim(),
      description: experienceData.description.trim(),
      end_date: currentlyWorking ? null : end_date,
    };

    setExperiences((prev) => [...prev, newExperience]);

    setExperienceData(initialExperience);
    setCurrentlyWorking(false);
    setError('');
  };

  const handleDeleteExperience = (index) => {
    setExperiences((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <Grid container spacing={3}>

      <FormGrid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight={600}>
          Add your experience
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Showcase your internships, jobs, freelance work and other
          professional experiences.
        </Typography>
      </FormGrid>

      {/* Organisation */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>Organisation</FormLabel>

        <OutlinedInput
          name="organisation"
          placeholder="e.g. Google, ABC Technologies"
          size="small"
          value={experienceData.organisation}
          onChange={handleChange}
        />
      </FormGrid>

      {/* Designation */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>Designation</FormLabel>

        <OutlinedInput
          name="designation"
          placeholder="e.g. Software Developer Intern"
          size="small"
          value={experienceData.designation}
          onChange={handleChange}
        />
      </FormGrid>

   {/* Description */}
<FormGrid size={{ xs: 12 }}>
  <FormLabel>Description</FormLabel>

  <OutlinedInput
    name="description"
    placeholder="Describe your responsibilities and achievements..."
    multiline
    minRows={3}
    size="small"
    value={experienceData.description}
    onChange={handleChange}
    sx={{
      alignItems: 'flex-start',
      '& textarea': {
        resize: 'vertical',
      },
    }}
  />
</FormGrid>

      {/* Start Date */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel required>Start Date</FormLabel>

        <OutlinedInput
          name="start_date"
          type="date"
          size="small"
          value={experienceData.start_date}
          onChange={handleChange}
          inputProps={{
            max: new Date().toISOString().split('T')[0],
          }}
        />
      </FormGrid>

      {/* End Date */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel>End Date</FormLabel>

        <OutlinedInput
          name="end_date"
          type="date"
          size="small"
          value={experienceData.end_date}
          onChange={handleChange}
          disabled={currentlyWorking}
          inputProps={{
            min: experienceData.start_date || undefined,
            max: new Date().toISOString().split('T')[0],
          }}
        />
      </FormGrid>

      {/* Currently Working */}
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={currentlyWorking}
              onChange={(e) => {
                setCurrentlyWorking(e.target.checked);

                if (e.target.checked) {
                  setExperienceData((prev) => ({
                    ...prev,
                    end_date: '',
                  }));
                }
              }}
            />
          }
          label="I currently work here"
          sx={{
            color: 'text.primary',
          }}
        />
      </FormGrid>

      {/* Error */}
      {error && (
        <FormGrid size={{ xs: 12 }}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </FormGrid>
      )}

      {/* Add Button */}
      <FormGrid size={{ xs: 12 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleAddExperience}
        >
          + Add Experience
        </Button>
      </FormGrid>

      {/* Added Experiences */}
      {experiences.length > 0 && (
        <FormGrid size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight={600}>
            Your Experiences ({experiences.length})
          </Typography>
        </FormGrid>
      )}

      {experiences.map((experience, index) => (
        <FormGrid size={{ xs: 12 }} key={index}>
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <Box>
                <Typography fontWeight={600}>
                  {experience.designation}
                </Typography>

                <Typography color="text.secondary">
                  {experience.organisation}
                </Typography>
              </Box>

              <Chip
                size="small"
                label={
                  experience.end_date
                    ? 'Completed'
                    : 'Currently working'
                }
                color={
                  experience.end_date ? 'default' : 'success'
                }
                variant="outlined"
              />
            </Box>

            {experience.description && (
              <Typography variant="body2">
                {experience.description}
              </Typography>
            )}

            <Typography variant="caption" color="text.secondary">
              {experience.start_date} — {experience.end_date || 'Present'}
            </Typography>

            <Button
              color="error"
              size="small"
              onClick={() => handleDeleteExperience(index)}
              sx={{ alignSelf: 'flex-end' }}
            >
              Remove
            </Button>
          </Box>
        </FormGrid>
      ))}

    </Grid>
  );
}
