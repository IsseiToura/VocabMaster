import React, { useEffect } from "react";
import { Paper, Text, Stack } from "@mantine/core";

function PracticeCard({
  word,
  meaning,
  isFlipped,
  onFlip,
  initialSide = "word",
}) {
  useEffect(() => {
    // Reset flip state when initialSide changes
    if (initialSide === "meaning") {
      onFlip();
    }
  }, [initialSide]);

  return (
    <div
      style={{
        width: "800px",
        height: "400px",
        position: "relative",
        perspective: "1000px",
      }}
    >
      <Paper
        shadow="sm"
        p="xl"
        w="100%"
        h="100%"
        onClick={onFlip}
        bg="gray.0"
        style={{
          cursor: "pointer",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Stack
          align="center"
          justify="center"
          spacing="md"
          style={{ height: "100%" }}
        >
          <Text size="2.5rem" fw={700}>
            {initialSide === "word" ? word : meaning}
          </Text>
          <Text c="dimmed" size="sm">
            Click to flip
          </Text>
        </Stack>
      </Paper>
      <Paper
        shadow="sm"
        p="xl"
        w="100%"
        h="100%"
        onClick={onFlip}
        bg="gray.0"
        style={{
          cursor: "pointer",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        <Stack
          align="center"
          justify="center"
          spacing="md"
          style={{ height: "100%" }}
        >
          <Text size="2.5rem" fw={700}>
            {initialSide === "word" ? meaning : word}
          </Text>
          <Text c="dimmed" size="sm">
            Click to flip
          </Text>
        </Stack>
      </Paper>
    </div>
  );
}

export default PracticeCard;
