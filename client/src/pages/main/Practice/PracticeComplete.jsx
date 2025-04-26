import React from "react";
import { Stack, Text, Title, Progress, Button } from "@mantine/core";

function PracticeComplete({ score, words, onPracticeAgain }) {
  return (
    <Stack align="center" spacing="xl" p="xl">
      <Title order={1} color="indigo">
        Practice Complete!
      </Title>
      <Stack align="center" spacing="md">
        <Text size="xl" fw={500}>
          Your Score: {score}/{words.length}
        </Text>
        <Progress
          value={(score / words.length) * 100}
          size="xl"
          w={400}
          color={score / words.length >= 0.7 ? "green" : "orange"}
        />
        <Text
          size="lg"
          color={score / words.length >= 0.7 ? "green" : "orange"}
        >
          {score / words.length >= 0.7
            ? "Great job! 🎉"
            : "Keep practicing! 💪"}
        </Text>
      </Stack>
      <Button
        size="xl"
        onClick={onPracticeAgain}
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
      >
        Practice Again
      </Button>
    </Stack>
  );
}

export default PracticeComplete;
