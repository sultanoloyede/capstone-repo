import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import mailboxImage from "/Users/bolajioloyede/Documents/Capstone/smart-mailbox-app/src/assets/mailboxLogo.svg";
import deliveredImage from "/Users/bolajioloyede/Documents/Capstone/smart-mailbox-app/src/assets/delivered.svg";
import emptyImage from "/Users/bolajioloyede/Documents/Capstone/smart-mailbox-app/src/assets/empty.svg";

// App-wide background
const AppBackground = styled.div`
  background-color: #3e404d; /* Replace with the exact dark blue color from your design */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Main container
const AppContainer = styled.div`
  background-color: #212229; // your app container color
  width: 75%; // width of the app container
  height: 80%; // height of the app container
  border-radius: 45px; // border radius for app container
  position: relative; // necessary for absolute child positioning
  overflow: hidden; // this prevents children from overflowing
  display: flex;
  align-items: flex-start; // aligns children to the top of the container
  justify-content: flex-start; // aligns children to the start (left)
  padding: 20px; // padding inside the app container
`;

const StatusContainer = styled.div`
  background-color: #a99da8; /* A placeholder color, replace with your desired color */
  width: 33%; /* This will make it less in width than the App Container */
  height: 95%; /* This will make it greater in height than the App Container */
  position: absolute;
  top: 2%; /* Adjust these values to position your container as desired */
  left: 35%;
  transform: translateX(-50%);
  z-index: 10; /* This ensures the container stays on top */
  border-radius: 45px; /* Adjust if your design has different border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adjust or remove as needed */
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
`;

const LoginContainer = styled.div`
  width: calc(100% - 40px); // full width of AppContainer minus padding
  max-width: 400px; // maximum width of the login container
  height: calc(100% - 300px); // full height of AppContainer minus padding
  max-height: 600px; // maximum height of the login container
  position: absolute; // positioned absolutely within AppContainer
  top: 90px; // distance from the top of AppContainer
  left: 600px; // distance from the left of AppContainer
  display: flex;
  flex-direction: column;
  align-items: center; /* This will center the child elements horizontally */
  justify-content: center; /* This will center the child elements vertically */
  padding: 20px; // padding inside the login container
  display: ${({ show }) => (show ? "none" : "block")};
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  width: 300px;
  height: 300px;
  border: 5px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${spinAnimation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: #343434; /* or any color you want for the input background */
  border: 2px solid #343434; /* Adjust the thickness (2px) and color (#000) as needed */
  border-radius: 45px; /* This rounds the corners of the input field */
  box-shadow: none; /* Removes any box-shadow if it exists */
  color: #fff;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px; /* Adjust the border-radius as needed */
  background-color: #4caf50; /* Adjust the color to match your design */
  color: white;
  font-size: 16px; /* Adjust the font-size as needed */
  cursor: pointer;
  margin-top: 10px; /* Adjust the margin as needed */
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049; /* Adjust for hover effect */
  }
`;

const Title = styled.h1`
  color: #ffffff; /* Adjust the color to match your design */
  margin-bottom: 80px; /* Adjust the margin as needed */
  font-size: 35px;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
`;

const Subtitle = styled.h1`
  color: #ffffff; /* Adjust the color to match your design */
  margin-bottom: -105px; /* Adjust the margin as needed */
  font-size: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
`;

const LargeTitle = styled.h1`
  color: #ffffff; /* Adjust the color to match your design */
  margin-bottom: 0px; /* Adjust the margin as needed */
  font-size: 160px;
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
`;

const StyledButton = styled.button`
  padding: 6.5px 45px;
  background-color: #212229; // Set to your preferred button color
  color: white; // Set to your preferred text color
  border-radius: 20px;
  font-weight: 100; // Adjust font size as needed
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  outline: none; // Removes the outline
  position: absolute;
  bottom: 10px; // Distance from the bottom of the LoginContainer
  left: 50%;
  transform: translateX(-50%); // Centers the button
  border: 0.5px solid #fff;
  transition: background-color 0.3s ease, color 0.3s ease; // Add transitions for background and text color

  &:hover {
    background-color: #fff; // Darker shade for the hover state
    color: #000; // Optional: change the text color on hover
  }
`;

const ImageContainer = styled.div`
  width: 100%; // Take up all available width
  height: auto; // Keep the aspect ratio of the image
  display: flex; // Use flexbox for centering
  justify-content: center; // Center horizontally
  align-items: center; // Center vertically
  padding: 20px; // Give some padding
  margin-top: 80px;
  margin-left: -23px;
`;

// Style for the image
const StyledImage = styled.img`
  max-width: 100%; // Ensures the image is no wider than its container
  max-height: 100%; // Ensures the image is no taller than its container
  display: block; // Prevents inline gaps
  // Adjust the following two lines to change the size of the image
  width: auto; // Keeps the image's aspect ratio
  height: auto; // Keeps the image's aspect ratio
  // If you want to make the image smaller, you can specify a max-width in pixels or percentage
  max-width: 300px; // Example fixed maximum size
  max-height: 300px; // Example fixed maximum size
`;

const UserInfoContainer = styled.div`
  position: absolute; // positioned absolutely within AppContainer
  top: 90px; // distance from the top of AppContainer
  left: 682px; // distance from the left of AppContainer
  display: flex;
  flex-direction: column;
  align-items: center; /* This will center the child elements horizontally */
  justify-content: center; /* This will center the child elements vertically */
`;

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [dots, setDots] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 0) return ".";
        if (prevDots.length === 3) return "";
        return prevDots + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      setShowLogin(false);
      // Simulated data for apartment number and name
      setApartmentNumber("123");
      setName("John Doe");
      // Randomly decide whether the status is 'delivered' or 'empty'
      setStatus(Math.random() < 0.5 ? "delivered" : "empty");
    }, 2000);
  };

  // Content based on the status
  const renderStatusContent = () => {
    switch (status) {
      case 'delivered':
        return (
          <>
            <ImageContainer>
              <StyledImage src={deliveredImage} alt="Delivered" />
            </ImageContainer>
            <Title>Mail Delivered</Title>
          </>
        );
      case 'empty':
        return (
          <>
            <ImageContainer>
              <StyledImage src={emptyImage} alt="Empty" />
            </ImageContainer>
            <Title>No Mail Today</Title>
          </>
        );
      default:
        return null; // or some placeholder content
    }
  };

  return (
    <AppBackground>
      <StatusContainer>
        {loading ? (
          // When loading, show the loader and the loading message
          <>
            <Loader />
            <Title>Loading{dots}</Title>
          </>
        ) : status ? (
          // If loading is complete and status is set, show status content
          renderStatusContent()
        ) : (
          // Initially, before loading starts, show the app title and image
          <>
            <ImageContainer>
              <StyledImage src={mailboxImage} alt="Mailbox" />
            </ImageContainer>
            <Title>Smart Mailbox App</Title>
          </>
        )}
      </StatusContainer>
      <AppContainer>
        {showLogin ? (
          // If showLogin is true, display the login container
          <LoginContainer>
            <Title>Login</Title>
            <Input type="text" placeholder="Apartment Number" />
            <Input type="password" placeholder="Password" />
            <StyledButton onClick={handleLogin}>Login</StyledButton>
          </LoginContainer>
        ) : (
          // If login is successful, display the user information
          <UserInfoContainer>
            <Title>Name: {name}</Title>
            <Subtitle>Apt #</Subtitle>
            <LargeTitle>{apartmentNumber}</LargeTitle>
          </UserInfoContainer>
        )}
      </AppContainer>
    </AppBackground>
  );
  
  
  
}

export default LoginPage;
