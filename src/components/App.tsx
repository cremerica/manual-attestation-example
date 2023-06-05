import React from "react";
import {
  Box,
  Button,
  Logo,
  Stack,
  ThemeProvider,
  Title,
} from "@cortexapps/plugin-core/components";
import "../baseStyles.css";
import ErrorBoundary from "./ErrorBoundary";

import { CortexApi } from "@cortexapps/plugin-core";

const getServiceTag = async (): Promise<string> => {
  const context = await CortexApi.getContext();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const serviceTag = context.entity!.tag;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return serviceTag as string;
};

const getServiceUser = async (): Promise<string> => {
  const context = await CortexApi.getContext();
  const serviceUser = context.user.name;
  return serviceUser as string;
}

const App: React.FC = () => {
 
  const postData = async () => { 
    console.log("about to use effect")
    React.useEffect(() => {
      console.log("about to get the serviceuser")
      const serviceUser = getServiceUser();
      console.log(serviceUser)
      const serviceTag = getServiceTag();
      console.log(serviceTag)    
      const response =  CortexApi.proxyFetch(`https://api.getcortexapp.com/api/v1/catalog/${serviceTag}/custom-data`, {
        method: 'POST',
        body: JSON.stringify({
        Description: "Manual Attestation",
        body: `key: Attestation, value: {user: ${serviceUser}`

      })
      }
    );
    const resultJson = JSON.stringify(response);
    console.log({resultJson});
  }, []);
   
  
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Stack>
          <Logo />
          <Title level={1}>My Awesome Cortex Plugin</Title>
          <Box>
            <Button
              onClick={() => {
                postData();
              }}
            >
              Attest
            </Button>
          </Box>
          
        </Stack>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
