import type React from "react";
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
import { useCallback, useState } from "react";
import { getCortexContext } from "../api/Cortex";

const App: React.FC = () => {
  const [cortexContext, setCortexContext] = useState<any>(null);

  const fetchContext = useCallback(async () => {
    const context = await getCortexContext();
    setCortexContext(context);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Stack>
          <Logo />
          <Title level={1}>My Awesome Cortex Plugin</Title>
          <Box>
            <Button
              onClick={() => {
                void fetchContext();
              }}
            >
              View context
            </Button>
          </Box>
          {Boolean(cortexContext) && (
            <>
              <Title level={2}>Plugin context</Title>
              <pre>{JSON.stringify(cortexContext, null, 2)}</pre>
            </>
          )}
        </Stack>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
