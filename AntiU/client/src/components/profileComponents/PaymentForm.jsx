// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import Box from '@mui/material/Box';
// import MuiCard from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import RadioGroup from '@mui/material/RadioGroup';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { styled } from '@mui/material/styles';
// import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
// import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
// import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

// const Card = styled(MuiCard)(({ theme }) => ({
//   border: '1px solid',
//   borderColor: (theme.vars || theme).palette.divider,
//   width: '100%',
//   '&:hover': {
//     background:
//       'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
//     borderColor: 'primary.light',
//     boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
//     ...theme.applyStyles('dark', {
//       background:
//         'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
//       borderColor: 'primary.dark',
//       boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
//     }),
//   },
//   [theme.breakpoints.up('md')]: {
//     flexGrow: 1,
//     maxWidth: `calc(50% - ${theme.spacing(1)})`,
//   },
//   variants: [
//     {
//       props: ({ selected }) => selected,
//       style: {
//         borderColor: (theme.vars || theme).palette.primary.light,
//         ...theme.applyStyles('dark', {
//           borderColor: (theme.vars || theme).palette.primary.dark,
//         }),
//       },
//     },
//   ],
// }));

// const PaymentContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   width: '100%',
//   height: 375,
//   padding: theme.spacing(3),
//   borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
//   border: '1px solid ',
//   borderColor: (theme.vars || theme).palette.divider,
//   background:
//     'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
//   boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
//   [theme.breakpoints.up('xs')]: {
//     height: 300,
//   },
//   [theme.breakpoints.up('sm')]: {
//     height: 350,
//   },
//   ...theme.applyStyles('dark', {
//     background:
//       'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
//     boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
//   }),
// }));

// const FormGrid = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'column',
// }));

// export default function PaymentForm() {
//   const [paymentType, setPaymentType] = React.useState('creditCard');
//   const [cardNumber, setCardNumber] = React.useState('');
//   const [cvv, setCvv] = React.useState('');
//   const [expirationDate, setExpirationDate] = React.useState('');

//   const handlePaymentTypeChange = (event) => {
//     setPaymentType(event.target.value);
//   };

//   const handleCardNumberChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
//     if (value.length <= 16) {
//       setCardNumber(formattedValue);
//     }
//   };

//   const handleCvvChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     if (value.length <= 3) {
//       setCvv(value);
//     }
//   };

//   const handleExpirationDateChange = (event) => {
//     const value = event.target.value.replace(/\D/g, '');
//     const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
//     if (value.length <= 4) {
//       setExpirationDate(formattedValue);
//     }
//   };

//   return (
//     <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
//       <FormControl component="fieldset" fullWidth>
//         <RadioGroup
//           aria-label="Payment options"
//           name="paymentType"
//           value={paymentType}
//           onChange={handlePaymentTypeChange}
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             gap: 2,
//           }}
//         >
//           <Card selected={paymentType === 'creditCard'}>
//             <CardActionArea
//               onClick={() => setPaymentType('creditCard')}
//               sx={{
//                 '.MuiCardActionArea-focusHighlight': {
//                   backgroundColor: 'transparent',
//                 },
//                 '&:focus-visible': {
//                   backgroundColor: 'action.hover',
//                 },
//               }}
//             >
//               <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <CreditCardRoundedIcon
//                   fontSize="small"
//                   sx={[
//                     (theme) => ({
//                       color: 'grey.400',
//                       ...theme.applyStyles('dark', {
//                         color: 'grey.600',
//                       }),
//                     }),
//                     paymentType === 'creditCard' && {
//                       color: 'primary.main',
//                     },
//                   ]}
//                 />
//                 <Typography sx={{ fontWeight: 'medium' }}>Card</Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//           <Card selected={paymentType === 'bankTransfer'}>
//             <CardActionArea
//               onClick={() => setPaymentType('bankTransfer')}
//               sx={{
//                 '.MuiCardActionArea-focusHighlight': {
//                   backgroundColor: 'transparent',
//                 },
//                 '&:focus-visible': {
//                   backgroundColor: 'action.hover',
//                 },
//               }}
//             >
//               <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <AccountBalanceRoundedIcon
//                   fontSize="small"
//                   sx={[
//                     (theme) => ({
//                       color: 'grey.400',
//                       ...theme.applyStyles('dark', {
//                         color: 'grey.600',
//                       }),
//                     }),
//                     paymentType === 'bankTransfer' && {
//                       color: 'primary.main',
//                     },
//                   ]}
//                 />
//                 <Typography sx={{ fontWeight: 'medium' }}>Bank account</Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         </RadioGroup>
//       </FormControl>
//       {paymentType === 'creditCard' && (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <PaymentContainer>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography variant="subtitle2">Credit card</Typography>
//               <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
//             </Box>
//             <SimCardRoundedIcon
//               sx={{
//                 fontSize: { xs: 48, sm: 56 },
//                 transform: 'rotate(90deg)',
//                 color: 'text.secondary',
//               }}
//             />
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 width: '100%',
//                 gap: 2,
//               }}
//             >
//               <FormGrid sx={{ flexGrow: 1 }}>
//                 <FormLabel htmlFor="card-number" required>
//                   Card number
//                 </FormLabel>
//                 <OutlinedInput
//                   id="card-number"
//                   autoComplete="card-number"
//                   placeholder="0000 0000 0000 0000"
//                   required
//                   size="small"
//                   value={cardNumber}
//                   onChange={handleCardNumberChange}
//                 />
//               </FormGrid>
//               <FormGrid sx={{ maxWidth: '20%' }}>
//                 <FormLabel htmlFor="cvv" required>
//                   CVV
//                 </FormLabel>
//                 <OutlinedInput
//                   id="cvv"
//                   autoComplete="CVV"
//                   placeholder="123"
//                   required
//                   size="small"
//                   value={cvv}
//                   onChange={handleCvvChange}
//                 />
//               </FormGrid>
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <FormGrid sx={{ flexGrow: 1 }}>
//                 <FormLabel htmlFor="card-name" required>
//                   Name
//                 </FormLabel>
//                 <OutlinedInput
//                   id="card-name"
//                   autoComplete="card-name"
//                   placeholder="John Smith"
//                   required
//                   size="small"
//                 />
//               </FormGrid>
//               <FormGrid sx={{ flexGrow: 1 }}>
//                 <FormLabel htmlFor="card-expiration" required>
//                   Expiration date
//                 </FormLabel>
//                 <OutlinedInput
//                   id="card-expiration"
//                   autoComplete="card-expiration"
//                   placeholder="MM/YY"
//                   required
//                   size="small"
//                   value={expirationDate}
//                   onChange={handleExpirationDateChange}
//                 />
//               </FormGrid>
//             </Box>
//           </PaymentContainer>
//           <FormControlLabel
//             control={<Checkbox name="saveCard" />}
//             label="Remember credit card details for next time"
//           />
//         </Box>
//       )}
//       {paymentType === 'bankTransfer' && (
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Alert severity="warning" icon={<WarningRoundedIcon />}>
//             Your order will be processed once we receive the funds.
//           </Alert>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
//             Bank account
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             Please transfer the payment to the bank account details shown below.
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//               Bank:
//             </Typography>
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Mastercredit
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//               Account number:
//             </Typography>
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               123456789
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//               Routing number:
//             </Typography>
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               987654321
//             </Typography>
//           </Box>
//         </Box>
//       )}
//     </Stack>
//   );
// }

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm({profileData, setProfileData}) {

  // const [name, setName]= useState("");
  // const [age, setAge]= useState("");
  // const [college, setCollege]= useState("");
  // const [branch, setBranch]= useState("");
  // const [heroline, setHeroline]= useState("");
  // const [year, setYear]= useState("");
  // const [course, setCourse]= useState("");

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Full name
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="text"
          placeholder="Riddhika P"
          autoComplete="given-name"
          required
          size="small"
          value={profileData.name}
          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value}))}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="age" required>
          Age
        </FormLabel>
        <OutlinedInput
          id="age"
          name="age"
          type="text"
          placeholder="19"
          autoComplete="age"
          required
          size="small"
          value={profileData.age}
          onChange={(e) => setProfileData(prev => ({ ...prev, age: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="heroline" required>
          Hero line for you
        </FormLabel>
        <OutlinedInput
          id="heroline"
          name="heroline"
          type="text"
          placeholder="My ability to learn holistically is my biggest unfair advantage!"
          required
          size="small"
          value={profileData.heroline}
          onChange={(e) => setProfileData(prev => ({ ...prev, heroline: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>Current address</FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="text"
          placeholder="BH-2, JU hostel, sitapura, jaipur"
          autoComplete="address-line1"
          required
          size="small"          
          value={profileData.address}
          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value}))}


        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="college" required>
          College/ University
        </FormLabel>
        <OutlinedInput
          id="college"
          name="college"
          type="text"
          placeholder="JECRC University"
          autoComplete="college"
          required
          size="small"
          value={profileData.college}
          onChange={(e) => setProfileData(prev => ({ ...prev, college: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="course" required>
          Course
        </FormLabel>
        <OutlinedInput
          id="course"
          name="course"
          type="text"
          placeholder="B.tech."
          autoComplete="course"
          required
          size="small"
          value={profileData.course}
          onChange={(e) => setProfileData(prev => ({ ...prev, course: e.target.value}))}
/>
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="branch" required>
          Branch
        </FormLabel>
        <OutlinedInput
          id="branch"
          name="branch"
          type="text"
          placeholder="CSE"
          autoComplete="branch"
          required
          size="small"
          value={profileData.branch}
          onChange={(e) => setProfileData(prev => ({ ...prev, branch: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="year" required>
          Curent graduation year
        </FormLabel>
        <OutlinedInput
          id="year"
          name="year"
          type="text"
          placeholder="2"
          autoComplete="studying_year"
          required
          size="small"
          value={profileData.year}
          onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value}))}

        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use the college name and address for networking"
        />
      </FormGrid>
    </Grid>
  );
}