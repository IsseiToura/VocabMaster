import React, { useState, useEffect } from "react";
import {
  Stack,
  Text,
  ActionIcon,
  Progress,
  Group,
  Title,
  SegmentedControl,
  Button,
} from "@mantine/core";
import { Check, X } from "lucide-react";
import PracticeCard from "../../../components/PracticeCard";
import PracticeComplete from "./PracticeComplete";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Practice() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [languageDirection, setLanguageDirection] = useState(
    "english-to-japanese"
  );
  const [showPractice, setShowPractice] = useState(false);
  const [wordResults, setWordResults] = useState([]);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/practice/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setWords(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [token]);

  useEffect(() => {
    // Reset flip state when language direction changes
    setIsFlipped(languageDirection === "japanese-to-english");
  }, [languageDirection]);

  const handleCorrect = async () => {
    const newScore = score + 1;
    setScore(newScore);
    const newWordResults = [
      ...wordResults,
      { wordId: words[currentCardIndex].wordId, isCorrect: true },
    ];
    setWordResults(newWordResults);

    if (currentCardIndex === words.length - 1) {
      setPracticeComplete(true);
      sendResults(newWordResults, newScore);
    } else {
      moveToNextCard();
    }
  };

  const handleIncorrect = () => {
    const newWordResults = [
      ...wordResults,
      { wordId: words[currentCardIndex].wordId, isCorrect: false },
    ];
    setWordResults(newWordResults);

    if (currentCardIndex === words.length - 1) {
      setPracticeComplete(true);
      sendResults(newWordResults, score);
    } else {
      moveToNextCard();
    }
  };

  const moveToNextCard = () => {
    setCurrentCardIndex(currentCardIndex + 1);
    setIsFlipped(languageDirection === "japanese-to-english");
  };

  const sendResults = async (finalResults, finalScore) => {
    try {
      const response = await fetch(`${API_BASE_URL}/practice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          wordResults: finalResults,
          score: finalScore,
          totalQuestions: words.length,
        }),
      });
      const data = await response.json();
      if (!data.success) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">{error}</Text>;
  if (practiceComplete)
    return (
      <PracticeComplete
        score={score}
        words={words}
        onPracticeAgain={() => {
          setShowPractice(false);
          setPracticeComplete(false);
          setCurrentCardIndex(0);
          setScore(0);
          setWordResults([]);
        }}
      />
    );

  const currentCard = words[currentCardIndex];

  if (!showPractice) {
    return (
      <Stack align="center" spacing="xl">
        <Title order={1}>Choose your practice mode!</Title>
        <Stack align="center" spacing="md">
          <SegmentedControl
            value={languageDirection}
            onChange={setLanguageDirection}
            size="xl"
            data={[
              { label: "English to Japanese", value: "english-to-japanese" },
              { label: "Japanese to English", value: "japanese-to-english" },
            ]}
          />
          <Button
            size="xl"
            onClick={() => setShowPractice(true)}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Start Practice
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack align="center" spacing="xl">
      <SegmentedControl
        value={languageDirection}
        onChange={setLanguageDirection}
        size="xl"
        data={[
          { label: "English to Japanese", value: "english-to-japanese" },
          { label: "Japanese to English", value: "japanese-to-english" },
        ]}
      />
      <PracticeCard
        word={currentCard.word}
        meaning={currentCard.meaning}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />
      <Group>
        <ActionIcon
          variant="gradient"
          gradient={{ from: "teal", to: "lime" }}
          size="xl"
          radius="xl"
          onClick={handleCorrect}
        >
          <Check size={24} />
        </ActionIcon>
        <ActionIcon
          variant="gradient"
          gradient={{ from: "red", to: "pink" }}
          size="xl"
          radius="xl"
          onClick={handleIncorrect}
        >
          <X size={24} />
        </ActionIcon>
      </Group>
      <Progress
        value={(currentCardIndex / words.length) * 100}
        w={400}
        color="violet"
      />
      <Text size="lg" fw={500}>
        Progress: {currentCardIndex + 1}/{words.length}
      </Text>
    </Stack>
  );
}

export default Practice;
