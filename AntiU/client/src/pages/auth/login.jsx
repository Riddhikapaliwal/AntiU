// import {Link} from "react-router";
// import { useState } from "react";


// function Login(){
//     const [email, setEmail]= useState("");
//     const [password, setPassword]= useState("");

//     const handleSubmit= async(event)=>{
//         event.preventDefault();
        
//         try{
//             const response= await fetch('http://localhost:3000/auth/login',{
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({email,password})
//             });

//             if(!response.ok){
//                 throw new Error('Failed to create user');
//             }

//             const newUser= await response.json();
//             sessionStorage.setItem("token", newUser.token)
//             console.log(newUser);
//             alert("login successfull");
//         }catch(error){
//             console.error('Submission error:', error)
//         }
//     }


//     return( 
//     <>
//         <h2>Login here!! </h2>

//         <form onSubmit={handleSubmit}>

//             <input type="email" placeholder="john@gmail.com" value={email} onChange={(event)=> setEmail(event.target.value)}/>
//             <br/>
//             <input type="password" placeholder="john123" value={password} onChange={(event)=> setPassword(event.target.value)}/>
//             <br/>
//             <input type="submit"/>
//         </form>
//         <Link to="/home">skip</Link>

//     </>

//     )
// }

// export default Login;


import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect.jsx';
import SignInCard from '../../components/authComponents/SignInCard.jsx';
import Content from '../../components/authComponents/Content.jsx';

export default function SignInSide(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}